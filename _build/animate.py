"""Inject slide transitions + auto-playing entrance animations into TestNG.pptx.

pptxgenjs cannot emit either, so we post-process the OOXML:
  * <p:transition> — Morph between content slides, Push at chapter breaks.
  * <p:timing>     — staggered Fade entrances, started by the slide itself
                     (no clicking), driven by the objectName groups
                     s<NN>_anim<nnn> written by build.js.
"""
import re, shutil, zipfile, os, sys

SRC = 'TestNG.pptx'
DST = 'TestNG-animated.pptx'

DIVIDERS = {2, 9, 15}          # chapter breaks  -> Push
FADE_ONLY = {1}                # opening slide   -> Fade
STAGGER = 220                  # ms between animation groups
DUR = 500                      # ms per fade

MC = 'http://schemas.openxmlformats.org/markup-compatibility/2006'
P14 = 'http://schemas.microsoft.com/office/powerpoint/2010/main'
# Morph lives in the PowerPoint 2016 extension namespace, not p14
P159 = 'http://schemas.microsoft.com/office/powerpoint/2015/09/main'


def transition_xml(n):
    if n in FADE_ONLY:
        return '<p:transition spd="slow"><p:fade/></p:transition>'
    if n in DIVIDERS:
        return '<p:transition spd="slow"><p:push dir="u"/></p:transition>'
    return (
        f'<mc:AlternateContent xmlns:mc="{MC}">'
        f'<mc:Choice xmlns:p159="{P159}" xmlns:p14="{P14}" Requires="p159">'
        '<p:transition spd="slow" p14:dur="900"><p159:morph option="byObject"/></p:transition>'
        '</mc:Choice><mc:Fallback>'
        '<p:transition spd="slow"><p:fade/></p:transition>'
        '</mc:Fallback></mc:AlternateContent>'
    )


def timing_xml(groups):
    """groups: list of lists of shape ids, in appearance order."""
    if not groups:
        return ''
    nid = [100]                     # animation node ids, disjoint from 1 & 2

    def i():
        nid[0] += 1
        return nid[0]

    effects, first = [], True
    for gi, ids in enumerate(groups):
        delay = gi * STAGGER
        for spid in ids:
            node = 'afterEffect' if first else 'withEffect'
            first = False
            effects.append(
                f'<p:par><p:cTn id="{i()}" presetID="10" presetClass="entr" presetSubtype="0"'
                f' fill="hold" grpId="0" nodeType="{node}">'
                f'<p:stCondLst><p:cond delay="{delay}"/></p:stCondLst><p:childTnLst>'
                f'<p:set><p:cBhvr><p:cTn id="{i()}" dur="1" fill="hold">'
                '<p:stCondLst><p:cond delay="0"/></p:stCondLst></p:cTn>'
                f'<p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl>'
                '<p:attrNameLst><p:attrName>style.visibility</p:attrName></p:attrNameLst>'
                '</p:cBhvr><p:to><p:strVal val="visible"/></p:to></p:set>'
                '<p:animEffect transition="in" filter="fade"><p:cBhvr>'
                f'<p:cTn id="{i()}" dur="{DUR}"/>'
                f'<p:tgtEl><p:spTgt spid="{spid}"/></p:tgtEl>'
                '</p:cBhvr></p:animEffect>'
                '</p:childTnLst></p:cTn></p:par>'
            )

    bld = ''.join(f'<p:bldP spid="{s}" grpId="0"/>' for g in groups for s in g)
    return (
        '<p:timing><p:tnLst><p:par>'
        '<p:cTn id="1" dur="indefinite" restart="never" nodeType="tmRoot"><p:childTnLst>'
        '<p:seq concurrent="1" nextAc="seek">'
        '<p:cTn id="2" dur="indefinite" nodeType="mainSeq"><p:childTnLst>'
        '<p:par><p:cTn id="3" fill="hold"><p:stCondLst>'
        '<p:cond delay="indefinite"/>'
        '<p:cond evt="onBegin" delay="0"><p:tn val="2"/></p:cond>'
        '</p:stCondLst><p:childTnLst>' + ''.join(effects) +
        '</p:childTnLst></p:cTn></p:par>'
        '</p:childTnLst></p:cTn>'
        '<p:prevCondLst><p:cond evt="onPrev" delay="0">'
        '<p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:prevCondLst>'
        '<p:nextCondLst><p:cond evt="onNext" delay="0">'
        '<p:tgtEl><p:sldTgt/></p:tgtEl></p:cond></p:nextCondLst>'
        '</p:seq></p:childTnLst></p:cTn></p:par></p:tnLst>'
        '<p:bldLst>' + bld + '</p:bldLst>'
        '</p:timing>'
    )


def process(xml, n):
    assert '<p:timing' not in xml, f'slide{n}: already has timing'
    groups, order = {}, []
    for sid, name in re.findall(r'<p:cNvPr id="(\d+)" name="([^"]*)"', xml):
        if re.fullmatch(r's\d+_anim\d+', name):
            if name not in groups:
                groups[name] = []
                order.append(name)
            groups[name].append(sid)
    order.sort(key=lambda k: int(k.split('anim')[1]))
    payload = transition_xml(n) + timing_xml([groups[k] for k in order])
    assert xml.rstrip().endswith('</p:sld>')
    out = xml.rstrip()[:-len('</p:sld>')] + payload + '</p:sld>'
    return out, len(order), sum(len(v) for v in groups.values())


def main():
    if os.path.exists(DST):
        os.remove(DST)
    zin = zipfile.ZipFile(SRC)
    zout = zipfile.ZipFile(DST, 'w', zipfile.ZIP_DEFLATED)
    log = []
    for item in zin.infolist():
        data = zin.read(item.filename)
        m = re.fullmatch(r'ppt/slides/slide(\d+)\.xml', item.filename)
        if m:
            n = int(m.group(1))
            xml, g, sh = process(data.decode('utf-8'), n)
            data = xml.encode('utf-8')
            kind = 'fade' if n in FADE_ONLY else 'push' if n in DIVIDERS else 'morph'
            log.append(f'slide{n:>2}  {kind:<6} {g} groups / {sh} shapes')
        zout.writestr(item, data)
    zout.close()
    zin.close()
    print('\n'.join(sorted(log, key=lambda s: int(re.search(r'\d+', s).group()))))
    print('->', DST)


main()
