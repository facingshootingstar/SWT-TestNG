const fs = require('fs');
const sharp = require('sharp');
const path = require('path');
const OUT = path.join(__dirname, 'img');
fs.mkdirSync(OUT, { recursive: true });

const raw = {
  testng: 'https://github.com/testng-team.png',
  junit:  'https://github.com/junit-team.png',
  beust:  'https://github.com/cbeust.png',
};

const icons = {
  selenium:     'selenium/43B02A',
  appium:       'appium/662D91',
  postman:      'postman/FF6C37',
  maven:        'apachemaven/C71A36',
  gradle:       'gradle/02303A',
  jenkins:      'jenkins/D24939',
  ghactions:    'githubactions/2088FF',
  gitlab:       'gitlab/FC6D26',
  intellij:     'intellijidea/000000',
  eclipse:      'eclipseide/2C2255',
  docker:       'docker/2496ED',
  java:         'openjdk/15181D',
};

const badges = {
  b_version:  'https://img.shields.io/maven-central/v/org.testng/testng?style=for-the-badge&label=maven%20central&color=6D28D9',
  b_commit:   'https://img.shields.io/github/last-commit/testng-team/testng?style=for-the-badge&color=6D28D9',
  b_stars:    'https://img.shields.io/github/stars/testng-team/testng?style=for-the-badge&color=6D28D9',
  b_contrib:  'https://img.shields.io/github/contributors/testng-team/testng?style=for-the-badge&color=6D28D9',
  b_license:  'https://img.shields.io/github/license/testng-team/testng?style=for-the-badge&color=6D28D9',
  b_java:     'https://img.shields.io/badge/Java-11%2B-6D28D9?style=for-the-badge&logo=openjdk&logoColor=white',
};

async function get(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!r.ok) throw new Error(url + ' -> ' + r.status);
  return Buffer.from(await r.arrayBuffer());
}

(async () => {
  const report = [];
  for (const [name, url] of Object.entries(raw)) {
    const b = await get(url);
    await sharp(b).resize({ height: 600, fit: 'inside' }).png().toFile(path.join(OUT, name + '.png'));
    report.push(name + ' ok');
  }
  for (const [name, slug] of Object.entries(icons)) {
    const b = await get('https://cdn.simpleicons.org/' + slug);
    await sharp(b, { density: 900 }).resize({ height: 512, fit: 'inside' })
      .png().toFile(path.join(OUT, name + '.png'));
    report.push(name + ' ok');
  }
  for (const [name, url] of Object.entries(badges)) {
    const b = await get(url);
    fs.writeFileSync(path.join(OUT, name + '.svg'), b);
    await sharp(b, { density: 600 }).resize({ height: 220, fit: 'inside' })
      .png().toFile(path.join(OUT, name + '.png'));
    report.push(name + ' ok :: ' + b.toString('utf8').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 90));
  }
  console.log(report.join('\n'));
})().catch(e => { console.error('FAIL', e.message); process.exit(1); });
