
class VentLoader {
    constructor() {

        // Mobile device style: fill the whole browser client area with the game canvas:
        if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
            const meta = document.createElement('meta');
            meta.name = 'viewport';
            meta.content = 'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes';
            document.getElementsByTagName('head')[0].appendChild(meta);

            const canvas = document.querySelector("#unity-canvas");
            canvas.style.width = "100%";
            canvas.style.height = "100%";
            canvas.style.position = "fixed";

            document.body.style.textAlign = "left";
        }

        createUnityInstance(document.querySelector("#unity-canvas"), {
            dataUrl: "http://odyssey.test/assets/video/odysseys/brimstone/3d/Build/vent2.data",
            frameworkUrl: "http://odyssey.test/assets/video/odysseys/brimstone/3d/Build/vent2.framework.js",
            codeUrl: "http://odyssey.test/assets/video/odysseys/brimstone/3d/Build/vent2.wasm",
            streamingAssetsUrl: "StreamingAssets",
            companyName: "DefaultCompany",
            productName: "Lüftungsschacht",
            productVersion: "0.1",
            // matchWebGLToCanvasSize: false, // Uncomment this to separately control WebGL canvas render size and DOM element size.
            // devicePixelRatio: 1, // Uncomment this to override low DPI rendering on high DPI displays.
        });
    }
}

export default VentLoader;
