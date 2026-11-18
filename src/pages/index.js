import React, { useState, useEffect, useRef } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import './index.css';

const DESKTOP_BACKGROUND_IMAGES = [
  'https://t.mwm.moe/fj',
  'https://bing.img.run/rand_1366x768.php',
  'https://api.mtyqx.cn/api/random.php',
];

const MOBILE_BACKGROUND_IMAGES = [
  'https://api.suyanw.cn/api/mao/',
  'https://t.mwm.moe/mp',
  'https://moe.jitsu.top/api',
];

const STAY_STAGES = [
  { max: 10_000, text: (s) => `${s}秒,欢迎你的来访٩(๑❛ᴗ❛๑)۶` },
  { max: 30_000, text: (s) => `${s}秒,这里是文案!你好呀~(oﾟ▽ﾟ)o` },
  { max: 60_000, text: (s) => `${s}秒,还在找想看的东西吗?ヾ(=･ω･=)o` },
  { max: 90_000, text: (_, m) => `${m}分,原来你是喜欢我吗,在这里呆这么久(*/ω＼*)` },
  { max: 120_000, text: (_, m) => `${m}分,这条文案不喜欢发颜文字!!!` },
  { max: 180_000, text: (_, m) => `${m}分,你在和我一起发呆吗(｀・ω・´)` },
  { max: 240_000, text: (_, m) => `${m}分,哇塞!你在这里三分钟了!( • ̀ω•́ )✧` },
  { max: 300_000, text: (_, m) => `${m}分,你想知道下一次这行字什么时候变化吗?` },
  { max: 360_000, text: (_, m) => `${m}分,答案是五分钟!!!o(￣ε￣*)` },
  { max: 480_000, text: (_, m) => `${m}分,嘻嘻~~~杂鱼~杂鱼~❤~见到我就走不开了~` },
  { max: 600_000, text: (_, m) => `${m}分,后面没有了,相信我☆(ゝω･)v` },
  { max: 900_000, text: (_, m) => `${m}分,好像有笨蛋忘记关浏览器了~~~o(´^｀)o哼哼哼!` },
  { max: 1_200_000, text: (_, m) => `${m}分,你住在这了???┌(。Д。)┐` },
  { max: 1_800_000, text: (_, m) => `${m}分,Σ(っ°Д°;)っ 404 找不到文案` },
  { max: 2_700_000, text: (_, m) => `${m}分,ʅ( ´・∧・｀)ʃ 我投降了!` },
  { max: 3_600_000, text: (_, m) => `${m}分,为你颁发─=≡Σ((( つ•̀ω•́)つ发呆达人` },
  { max: Infinity, text: (_, __, h) => `${h}小时,♪＼( >w<)︿(QwQ )／♪` },
];

const SITE_OPEN_TIMESTAMP = 1732948276347;

function formatStayTime(time) {
  const sec = Math.round(time / 1000);
  const min = Math.round(time / 600) / 100;
  const hour = Math.round(time / 360) / 10000;
  const stage = STAY_STAGES.find((s) => time <= s.max) ?? STAY_STAGES[STAY_STAGES.length - 1];
  return stage.text(sec, min, hour);
}

function formatOpenTime(time) {
  return `${Math.round(time / 864) / 100000}天`;
}

export default function HomePage() {
  const isMobileRatioOldRef = useRef(null);

  const [backgroundImage, setBackgroundImage] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [stayTime, setStayTime] = useState('');
  // logoColor 已移除，颜色交给 CSS 动画

  useEffect(() => {
    const isMobileRatio = () => window.innerHeight / window.innerWidth > 1;

    const selectRandomBackgroundImage = () => {
      const images = isMobileRatio() ? MOBILE_BACKGROUND_IMAGES : DESKTOP_BACKGROUND_IMAGES;
      setBackgroundImage(images[Math.floor(Math.random() * images.length)]);
    };

    const cometime = Date.now();

    const update = () => {
      const now = Date.now();
      setOpenTime(formatOpenTime(now - SITE_OPEN_TIMESTAMP));
      setStayTime(formatStayTime(now - cometime));
    };

    update();
    selectRandomBackgroundImage();
    isMobileRatioOldRef.current = isMobileRatio();

    // 时间文案每 500ms 刷新一次即可，与颜色动画解耦
    const timer = setInterval(update, 500);

    const handleResize = () => {
      const nowMobile = isMobileRatio();
      if (nowMobile === isMobileRatioOldRef.current) return;
      isMobileRatioOldRef.current = nowMobile;
      selectRandomBackgroundImage();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      clearInterval(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Layout description="乾狐のBlog站，乾狐的小站，乾狐离光，乾狐梦影，QHMY, QHLG, Flime">
      <div id="index-page-container">
        <div id="index-page-bg" style={{ backgroundImage: `url(${backgroundImage})` }} />
        <div id="index-page-bg-mask" />
        <div id="index-page-main">
          <div id="logo" style={{ textAlign: 'center' }}>
            <span>一只快速的Flime跳过了懒惰的QHLG</span>
          </div>
          <div id="index-page-description" style={{ textAlign: 'center' }}>
            欢迎来到我的小站!想来点什么?
            <br />
            本站已启用{openTime}
            <br />
            你已经在本页面{stayTime}
          </div>
          <div id="index-page-button-container">
            <div id="index-page-button">
              <Link className="button button--secondary button--lg" to="./blog">
                偷看日记
              </Link>
              <Link className="button button--secondary button--lg" to="./docs/intro">
                抱走狐狸
              </Link>
              <Link className="button button--secondary button--lg" to="./docs/game">
                看看游戏
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}