// Regenerate crawlable homepage content after changing the site URL or videos.
// Generated files are committed to dist; hosting needs no extra build step.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const config = JSON.parse(fs.readFileSync(path.join(root, 'seo.config.json'), 'utf8'));
const escape = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const url = new URL(config.url).href;
const orgId = url + '#organization';
const personId = url + '#neeraj-sachdeva';
const areas = config.areas.map(name => ({'@type':'Place', name}));
const services = [
  ['production', 'Video production', 'Concept development, shoot planning and filming for music videos, brand films, reels and narrative films.'],
  ['editing', 'Video editing and post-production', 'Editing, colour grading and sound finishing for films, trailers, microdrama promos, music videos, YouTube, podcasts and weddings.'],
  ['social', 'Social media marketing', 'Content strategy, content calendars and campaign creatives.'],
  ['influencer', 'Influencer marketing', 'Creator discovery, campaign planning and content coordination.']
];
const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {'@type':'Organization','@id':orgId,name:config.name,url,logo:url+'assets/bs-logo.png',description:config.description,sameAs:[config.instagram],areaServed:areas,
      contactPoint:config.phones.map(telephone=>({'@type':'ContactPoint',telephone,contactType:'customer enquiries'})),
      hasOfferCatalog:{'@type':'OfferCatalog',name:'Creative services',itemListElement:services.map(([id])=>({'@type':'Offer',itemOffered:{'@id':url+'#service-'+id}}))}},
    {'@type':'Person','@id':personId,name:'Neeraj Sachdeva',jobTitle:'Video Editor',sameAs:[config.imdb]},
    {'@type':'WebSite','@id':url+'#website',url,name:config.name,inLanguage:'en',publisher:{'@id':orgId}},
    {'@type':'WebPage','@id':url+'#webpage',url,name:config.title,description:config.description,inLanguage:'en',isPartOf:{'@id':url+'#website'},about:[{'@id':orgId},{'@id':personId}]},
    ...services.map(([id,name,description])=>({'@type':'Service','@id':url+'#service-'+id,name,description,provider:{'@id':orgId},areaServed:areas,url:url+'#service-'+id}))
  ]
};
const head = `<!-- seo:start -->
<title>${escape(config.title)}</title>
<meta name="description" content="${escape(config.description)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<link rel="canonical" href="${url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${escape(config.name)}">
<meta property="og:locale" content="en_IN">
<meta property="og:title" content="${escape(config.title)}">
<meta property="og:description" content="${escape(config.description)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${url}assets/bs-social.png">
<meta property="og:image:type" content="image/png">
<meta property="og:image:width" content="600">
<meta property="og:image:height" content="600">
<meta property="og:image:alt" content="Bright Scene Studioz gold camera logo">
<meta name="twitter:card" content="summary">
<meta name="twitter:title" content="${escape(config.title)}">
<meta name="twitter:description" content="${escape(config.description)}">
<meta name="twitter:image" content="${url}assets/bs-social.png">
<meta name="twitter:image:alt" content="Bright Scene Studioz gold camera logo">
<script type="application/ld+json">${JSON.stringify(schema).replace(/</g,'\\u003c')}</script>
<!-- seo:end -->`;
const sandbox = {window:{}};
vm.runInNewContext(fs.readFileSync(path.join(root, 'dist/videos.js'),'utf8'),sandbox);
const cards = sandbox.window.EDITED_VIDEOS.slice(0,6).map((v,i)=>`<a class="video-card" href="https://www.youtube.com/watch?v=${escape(v.id)}" target="_blank" rel="noopener noreferrer"><div class="video-thumb"><img src="https://i.ytimg.com/vi/${escape(v.id)}/hqdefault.jpg" alt="${escape(v.title)}" width="480" height="360" loading="${i<3?'eager':'lazy'}" decoding="async"><span aria-hidden="true">▶</span></div><small>${v.role==='production'?'PRODUCTION':'EDITING'} · ${escape(v.category)}</small><h3>${escape(v.title)}</h3><p>Watch on YouTube ↗</p></a>`).join('\n');
const file = path.join(root,'dist/index.html');
let html = fs.readFileSync(file,'utf8');
if(!html.includes('<!-- seo:start -->') || !html.includes('<!-- portfolio:start -->')) throw Error('SEO generation markers missing');
html=html.replace(/<!-- seo:start -->[\s\S]*?<!-- seo:end -->/,head)
  .replace(/<!-- portfolio:start -->[\s\S]*?<!-- portfolio:end -->/,'<!-- portfolio:start -->\n'+cards+'\n<!-- portfolio:end -->');
fs.writeFileSync(file,html);
fs.writeFileSync(path.join(root,'dist/robots.txt'),`User-agent: *\nAllow: /\n\nSitemap: ${url}sitemap.xml\n`);
// Only the actual page is listed; section/filter anchors are not separate URLs.
fs.writeFileSync(path.join(root,'dist/sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><url><loc>${escape(url)}</loc></url></urlset>\n`);
console.log('Generated homepage metadata, structured data, six static portfolio cards, robots.txt and sitemap.xml.');
