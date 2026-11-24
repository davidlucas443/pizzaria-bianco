import { chromium } from 'playwright-core';
const b=await chromium.launch({executablePath:'C:/Program Files/Google/Chrome/Application/chrome.exe',headless:true});
try {
 const p=await b.newPage({viewport:{width:1440,height:1000}}); await p.goto(process.env.BIANCO_URL || 'http://127.0.0.1:5173',{waitUntil:'networkidle'}); await p.waitForTimeout(1800);
 console.log(await p.evaluate(()=>[...document.querySelectorAll('main > section')].map(e=>({id:e.id,top:e.offsetTop,height:e.offsetHeight}))));
 for(const progress of [.05,.52,.95,.52]) {await p.evaluate(progress=>scrollTo(0,document.querySelector('.flavor-journey').offsetTop+innerHeight*1.8*progress),progress);await p.waitForTimeout(1500);console.log(await p.evaluate(()=>({y:scrollY,pin:document.querySelector('.flavor-pin').getBoundingClientRect().top,photos:[...document.querySelectorAll('.flavor-visual img')].map(e=>getComputedStyle(e).opacity)})));}
 await p.screenshot({path:'.qa/rebrand/scene-inspection.png'});
}finally{await b.close();}
