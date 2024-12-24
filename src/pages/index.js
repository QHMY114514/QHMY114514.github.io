import React, { useState, useEffect } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';

import './index.css'

export default function () {

    // 定义背景图片链接数组
    const desktopBackgroundImages = [
        "https://api.oick.cn/random/api.php?type=pc",
        "https://t.mwm.moe/fj",
        "https://t.mwm.moe/pc",
        "https://api.miaomc.cn/image/get",
        "https://bing.img.run/rand_1366x768.php",
        "https://api.mtyqx.cn/api/random.php"
    ];

    const mobileBackgroundImages = [
        "https://api.oick.cn/random/api.php?type=pe",
        "https://api.suyanw.cn/api/mao/",
        "https://t.mwm.moe/mp",
        "https://moe.jitsu.top/api",
    ];

    // 判断屏幕比例是否接近手机（高宽比大于1）
    var isMobileRatioOld;
    const isMobileRatio = () => {
        const aspectRatio = window.innerHeight / window.innerWidth;
        return aspectRatio > 1;
    };

    // 定义状态存储背景图片
    const [backgroundImage, setBackgroundImage] = useState('');

    // 随机选择背景图片
    const selectRandomBackgroundImage = () => {
        const images = isMobileRatio() ? mobileBackgroundImages : desktopBackgroundImages;
        const randomIndex = Math.floor(Math.random() * images.length);
        setBackgroundImage(images[randomIndex]);
    };

    const [logoColor, setLogoColor] = useState('');
    const [openTime, setOpenTime] = useState('');
    const [stayTime, setStayTime] = useState('');

    // 在组件挂载时选择背景图片
    useEffect(() => {
        var cometime = new Date();

        update();
        setInterval(() => {
            update();
        }, 100);

        function update() {
            setLogoColor(`hsl(${(new Date() / 30) % 360},50%,70%)`);
            setOpenTime(TimetoTextDay(new Date() - 1732948276347));
            setStayTime(TimetoTextStay(new Date() - cometime));
        }

        function TimetoTextDay(time) {
            return `${Math.round(time / 864) / 100000}天`;
        }
        
        function TimetoTextStay(time) {
            if (time <= 10000) {
                return `${Math.round(time / 1000)}秒,欢迎你的来访٩(๑❛ᴗ❛๑)۶`;
            }
            else if (time < 30000) {
                return `${Math.round(time / 1000)}秒,这里是文案!你好呀~(oﾟ▽ﾟ)o  `;
            }
            else if (time < 60000) {
                return `${Math.round(time / 1000)}秒,还在找想看的东西吗?ヾ(=･ω･=)o`;
            }
            else if (time < 90000) {
                return `${Math.round(time / 600) / 100}分,原来你是喜欢我吗,在这里呆这么久(*/ω＼*)`;
            }
            else if (time < 120000) {
                return `${Math.round(time / 600) / 100}分,这条文案不喜欢发颜文字!!!`;
            }
            else if (time < 180000) {
                return `${Math.round(time / 600) / 100}分,你在和我一起发呆吗(｀・ω・´)`;
            }
            else if (time < 240000) {
                return `${Math.round(time / 600) / 100}分,哇塞!你在这里三分钟了!( • ̀ω•́ )✧`;
            }
            else if (time < 300000) {
                return `${Math.round(time / 600) / 100}分,你想知道下一次这行字什么时候变化吗?`;
            }
            else if (time < 360000) {
                return `${Math.round(time / 600) / 100}分,答案是五分钟!!!o(￣ε￣*) `;
            }
            else if (time < 480000) {
                return `${Math.round(time / 600) / 100}分,嘻嘻~~~杂鱼~杂鱼~❤~见到我就走不开了~`;
            }
            else if (time < 600000) {
                return `${Math.round(time / 600) / 100}分,后面没有了,相信我☆(ゝω･)v`;
            }
            else if (time < 900000) {
                return `${Math.round(time / 600) / 100}分,好像有笨蛋忘记关浏览器了~~~o(´^｀)o哼哼哼!`;
            }
            else if (time < 1200000) {
                return `${Math.round(time / 600) / 100}分,你住在这了???┌(。Д。)┐`;
            }
            else if (time < 1800000) {
                return `${Math.round(time / 600) / 100}分,Σ(っ°Д°;)っ 404 找不到文案`;
            }
            else if (time < 2700000) {
                return `${Math.round(time / 600) / 100}分,ʅ( ´・∧・｀)ʃ 我投降了!`;
            }
            else if (time < 3600000) {
                return `${Math.round(time / 600) / 100}分,为你颁发─=≡Σ((( つ•̀ω•́)つ发呆达人`;
            }
            else {
                return `${Math.round(time / 360) / 10000}小时,♪＼( >w<)︿(QwQ )／♪`;
            }
        }
        
        // 初始化时选择背景图片
        selectRandomBackgroundImage();
        isMobileRatioOld = isMobileRatio();

        // 监听窗口大小变化，动态调整背景图片
        const handleResize = () => {
            if (isMobileRatio() == isMobileRatioOld) return;
            isMobileRatioOld = isMobileRatio();
            selectRandomBackgroundImage();
        };

        // 添加resize事件监听器
        window.addEventListener('resize', handleResize);

        // 清理事件监听器
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    return (
        <Layout description='乾狐のBlog站，乾狐的小站，乾狐离光，乾狐梦影，QHMY, QHLG, Flime'>
            <div id='index-page-container'>
                {/* Set the background image dynamically */}
                <div id='index-page-bg' style={{ backgroundImage: `url(${backgroundImage})` }}></div>
                <div id='index-page-bg-mask'></div>
                <div id='index-page-main'>
                    <div id='logo' style={{ textAlign: "center", color: `${logoColor}` }}>
                        <span>一只快速的Flime跳过了懒惰的QHLG</span>
                    </div>
                    <div id='index-page-description' style={{ textAlign: "center"}}>
                        欢迎来到我的小站!想来点什么?<br />本站已启用{openTime}<br />你已经在本页面{stayTime}
                    </div>
                    <div id='index-page-button-container'>
                        <div id='index-page-button'>
                            <Link
                                className="button button--secondary button--lg"
                                to="./blog">
                                偷看日记
                            </Link>
                            <Link
                                className="button button--secondary button--lg"
                                to="./docs/intro">
                                抱走狐狸
                            </Link>
                            <Link
                                className="button button--secondary button--lg"
                                to="./docs/game">
                                看看游戏
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
