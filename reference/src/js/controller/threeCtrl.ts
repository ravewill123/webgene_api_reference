export function register(app) {
    ////////////// controller /////////////


    app.controller('threeCtrl',
        ['$scope', '$stateParams', '$state', '$timeout', 'getSearch',
            function($scope, $stateParams, $state, $timeout, getSearch) {

                let T3D: TreeEngine;
                let face = 'facebook';

                // 儘量確實地釋放資源
                $scope.$on(
                    "$destroy",
                    function handleDestroyEvent() {
                        if (T3D) T3D.destroy();
                    }
                );

                
                requestAnimationFrame(() => {
                    let html = '';
                    // 也可以使用ngRepeat繪製html,這邊展示使用ES6的字符串結合js的方便性
                    for (let i = 0; i < 49; i++) {
                        if (i == 0 && $scope.fb.uid != undefined) {
                            html += `<div><img src="https://graph.facebook.com/${$scope.fb.uid}/picture?width=200&height=200"></div>`;
                        } else {
                            html += `<div><img src="https://graph.facebook.com/${face}/picture?width=200&height=200"></div>`;
                        }
                    }
                    (<HTMLElement>document.querySelector('#container')).innerHTML = html;
                    T3D = new TreeEngine($scope.fb.uid != undefined);
                });
                

            }]);


    ////////////// controller /////////////
}










//////////////////////////////////////////////////////
// 3D Class
//////////////////////////////////////////////////////

class Flash {
    public target;

    constructor(tg) {
        this.target = tg;
        // this.blingbling();
    }

    blingbling() {
        let d = 1;
        TweenLite.to(this.target.rotation, 0.5 + Math.random(), { ease: Power1.easeInOut, x: d / 2 - Math.random() * d, y: d / 2 - Math.random() * d, onComplete: () => { this.blingbling() } });
    }

    destroy() {
        TweenLite.killTweensOf(this.target.rotation);
        this.target = null;
    }
}


class TreeEngine {
    public camera;
    public scene;
    public renderer;
    public area3D;
    public maxH = 736;
    public state = 0;
    public objects = [];
    public flash = [];
    public timer;
    public Framer;
    public targets = {
        graph1: [ // 拐子
            { x: -300, y: 800, z: 0 }, { x: -100, y: 800, z: 0 }, { x: 100, y: 800, z: 0 }, { x: 300, y: 800, z: 0 },
            { x: -500, y: 600, z: 0 }, { x: -300, y: 600, z: 0 }, { x: -100, y: 600, z: 0 }, { x: 100, y: 600, z: 0 }, { x: 300, y: 600, z: 0 }, { x: 500, y: 600, z: 0 },
            { x: -500, y: 400, z: 0 }, { x: -300, y: 400, z: 0 }, { x: 300, y: 400, z: 0 }, { x: 500, y: 400, z: 0 },
            { x: -500, y: 200, z: 0 }, { x: -300, y: 200, z: 0 }, { x: 300, y: 200, z: 0 }, { x: 500, y: 200, z: 0 },
            { x: -500, y: 0, z: 0 }, { x: -300, y: 0, z: 0 }, { x: 300, y: 0, z: 0 }, { x: 500, y: 0, z: 0 },
            { x: -500, y: -200, z: 0 }, { x: -300, y: -200, z: 0 },
            { x: -500, y: -400, z: 0 }, { x: -300, y: -400, z: 0 },
            { x: -500, y: -600, z: 0 }, { x: -300, y: -600, z: 0 },
            { x: -500, y: -800, z: 0 }, { x: -300, y: -800, z: 0 }, 
            //
            { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }
        ], graph2: [ // 伶當
            { x: -100, y: 800, z: 0 }, { x: 100, y: 800, z: 0 },
            { x: -300, y: 600, z: 0 }, { x: -100, y: 600, z: 0 }, { x: 100, y: 600, z: 0 }, { x: 300, y: 600, z: 0 },
            { x: -300, y: 400, z: 0 }, { x: -100, y: 400, z: 0 }, { x: 100, y: 400, z: 0 }, { x: 300, y: 400, z: 0 },
            { x: -400, y: 200, z: 0 }, { x: -200, y: 200, z: 0 }, { x: 0, y: 200, z: 0 }, { x: 200, y: 200, z: 0 }, { x: 400, y: 200, z: 0 },
            { x: -500, y: 0, z: 0 }, { x: -300, y: 0, z: 0 }, { x: -100, y: 0, z: 0 }, { x: 100, y: 0, z: 0 }, { x: 300, y: 0, z: 0 }, { x: 500, y: 0, z: 0 },
            { x: -600, y: -200, z: 0 }, { x: -400, y: -200, z: 0 }, { x: -200, y: -200, z: 0 }, { x: 0, y: -200, z: 0 }, { x: 200, y: -200, z: 0 }, { x: 400, y: -200, z: 0 }, { x: 600, y: -200, z: 0 },
            { x: -700, y: -400, z: 0 }, { x: -500, y: -400, z: 0 }, { x: -300, y: -400, z: 0 }, { x: -100, y: -400, z: 0 }, { x: 100, y: -400, z: 0 }, { x: 300, y: -400, z: 0 }, { x: 500, y: -400, z: 0 }, { x: 700, y: -400, z: 0 },
            { x: -100, y: -600, z: 0 }, { x: 100, y: -600, z: 0 },
            { x: 0, y: -800, z: 0 },
            //
            { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }
        ], graph3: [ // 生誕帽
            { x: -100, y: 800, z: 0 }, { x: 100, y: 800, z: 0 }, { x: 300, y: 800, z: 0 },
            { x: -300, y: 600, z: 0 }, { x: -100, y: 600, z: 0 }, { x: 300, y: 600, z: 0 }, { x: 500, y: 600, z: 0 },
            { x: -400, y: 400, z: 0 }, { x: -200, y: 400, z: 0 }, { x: 0, y: 400, z: 0 }, { x: 700, y: 400, z: 0 },
            { x: -500, y: 200, z: 0 }, { x: -300, y: 200, z: 0 }, { x: -100, y: 200, z: 0 }, { x: 100, y: 200, z: 0 },
            { x: -500, y: 0, z: 0 }, { x: -300, y: 0, z: 0 }, { x: -100, y: 0, z: 0 }, { x: 100, y: 0, z: 0 }, { x: 300, y: 0, z: 0 },
            { x: -500, y: -200, z: 0 }, { x: -300, y: -200, z: 0 }, { x: -100, y: -200, z: 0 }, { x: 100, y: -200, z: 0 }, { x: 300, y: -200, z: 0 }, { x: 500, y: -200, z: 0 },
            { x: -600, y: -400, z: 0 }, { x: -400, y: -400, z: 0 }, { x: -200, y: -400, z: 0 }, { x: 0, y: -400, z: 0 }, { x: 200, y: -400, z: 0 }, { x: 400, y: -400, z: 0 }, { x: 600, y: -400, z: 0 },
            { x: -700, y: -600, z: 0 }, { x: -500, y: -600, z: 0 }, { x: -300, y: -600, z: 0 }, { x: -100, y: -600, z: 0 }, { x: 100, y: -600, z: 0 }, { x: 300, y: -600, z: 0 }, { x: 500, y: -600, z: 0 }, { x: 700, y: -600, z: 0 },
            { x: -700, y: -800, z: 0 }, { x: -500, y: -800, z: 0 }, { x: -300, y: -800, z: 0 }, { x: -100, y: -800, z: 0 }, { x: 100, y: -800, z: 0 }, { x: 300, y: -800, z: 0 }, { x: 500, y: -800, z: 0 }, { x: 700, y: -800, z: 0 }
        ], graph4: [ // 樹
            { x: 0, y: 800, z: 0 },
            { x: -100, y: 600, z: 0 }, { x: 100, y: 600, z: 0 },
            { x: -200, y: 400, z: 0 }, { x: 0, y: 400, z: 0 }, { x: 200, y: 400, z: 0 },
            { x: -300, y: 200, z: 0 }, { x: -100, y: 200, z: 0 }, { x: 100, y: 200, z: 0 }, { x: 300, y: 200, z: 0 },
            { x: -400, y: 0, z: 0 }, { x: -200, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }, { x: 200, y: 0, z: 0 }, { x: 400, y: 0, z: 0 },
            { x: -500, y: -200, z: 0 }, { x: -300, y: -200, z: 0 }, { x: -100, y: -200, z: 0 }, { x: 100, y: -200, z: 0 }, { x: 300, y: -200, z: 0 }, { x: 500, y: -200, z: 0 },
            { x: -600, y: -400, z: 0 }, { x: -400, y: -400, z: 0 }, { x: -200, y: -400, z: 0 }, { x: 0, y: -400, z: 0 }, { x: 200, y: -400, z: 0 }, { x: 400, y: -400, z: 0 }, { x: 600, y: -400, z: 0 },
            { x: -700, y: -600, z: 0 }, { x: -500, y: -600, z: 0 }, { x: -300, y: -600, z: 0 }, { x: -100, y: -600, z: 0 }, { x: 100, y: -600, z: 0 }, { x: 300, y: -600, z: 0 }, { x: 500, y: -600, z: 0 }, { x: 700, y: -600, z: 0 },
            { x: 0, y: -800, z: 0 },
            //
            { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }, { x: 0, y: 8000, z: 8000 }
        ], graph5: [ // 襪子
            { x: 100, y: 800, z: 0 }, { x: 300, y: 800, z: 0 }, { x: 500, y: 800, z: 0 }, { x: 700, y: 800, z: 0 },
            { x: 100, y: 600, z: 0 }, { x: 300, y: 600, z: 0 }, { x: 500, y: 600, z: 0 }, { x: 700, y: 600, z: 0 },
            { x: 100, y: 400, z: 0 }, { x: 300, y: 400, z: 0 }, { x: 500, y: 400, z: 0 }, { x: 700, y: 400, z: 0 },
            { x: 100, y: 200, z: 0 }, { x: 300, y: 200, z: 0 }, { x: 500, y: 200, z: 0 }, { x: 700, y: 200, z: 0 },
            { x: -500, y: 0, z: 0 }, { x: -300, y: 0, z: 0 }, { x: -100, y: 0, z: 0 }, { x: 100, y: 0, z: 0 }, { x: 300, y: 0, z: 0 }, { x: 500, y: 0, z: 0 }, { x: 700, y: 0, z: 0 },
            { x: -700, y: -200, z: 0 }, { x: -500, y: -200, z: 0 }, { x: -300, y: -200, z: 0 }, { x: -100, y: -200, z: 0 }, { x: 100, y: -200, z: 0 }, { x: 300, y: -200, z: 0 }, { x: 500, y: -200, z: 0 }, { x: 700, y: -200, z: 0 },
            { x: -700, y: -400, z: 0 }, { x: -500, y: -400, z: 0 }, { x: -300, y: -400, z: 0 }, { x: -100, y: -400, z: 0 }, { x: 100, y: -400, z: 0 }, { x: 300, y: -400, z: 0 }, { x: 500, y: -400, z: 0 }, { x: 700, y: -400, z: 0 },
            { x: -500, y: -600, z: 0 }, { x: -300, y: -600, z: 0 }, { x: -100, y: -600, z: 0 }, { x: 100, y: -600, z: 0 }, { x: 300, y: -600, z: 0 }, { x: 500, y: -600, z: 0 },
            { x: -300, y: -800, z: 0 }, { x: -100, y: -800, z: 0 }, { x: 100, y: -800, z: 0 }, { x: 300, y: -800, z: 0 }
        ]
    };

    constructor(user_pic: boolean = false) {
        this.camera = new THREE.PerspectiveCamera(40, window.innerWidth / this.maxH, 1, 10000);
        this.camera.position.z = 5500;

        this.scene = new THREE.Scene();

        this.renderer = new THREE.CSS3DRenderer();
        this.renderer.setSize(window.innerWidth, this.maxH);
        this.renderer.domElement.style.position = 'absolute';
        this.renderer.domElement.style.overflow = 'hidden';
        document.getElementById('container').appendChild(this.renderer.domElement);

        this.area3D = new THREE.Object3D();
        this.scene.add(this.area3D);

        let picDiv = document.querySelectorAll('#container > div');
        for (let i = 0; i < 49; i++) {
            let object = new THREE.CSS3DObject(picDiv[i]);

            if (i == 0 && user_pic) {
                object.position.x = 0;
                object.position.y = -20;
                object.position.z = 4500;
            } else {
                object.position.x = Math.random() * 1200 - 600;
                object.position.y = Math.random() * 1200 - 600;
                object.position.z = 8000;
            }


            this.area3D.add(object);
            this.objects.push(object);


            this.flash.push(new Flash(object));
        }
        if (user_pic) {
            this.timer = setTimeout(() => {
                this.start();
            }, 1000 * 1.5);
        } else {
            this.start();
        }

        window.addEventListener('resize', () => { this.onWindowResize() }, false);
        this.animate();
    }

    start() {
        this.rotation();
        this.transform(this.targets.graph1, 2);
        for (let i = 0; i < this.flash.length; i++) {
            this.flash[i].blingbling();
        }
    }

    rotation() {
        let d = 0.6;
        TweenLite.to(this.area3D.rotation, 3, { ease: Power1.easeInOut, x: d / 2 - Math.random() * d, y: d / 2 - Math.random() * d, z: d / 2 - Math.random() * d, onComplete: () => { this.rotation() } });
    }

    transform(target, duration, delay = 0) {
        for (let i = 0; i < 49; i++) {
            TweenLite.to(this.objects[i].position, duration, { x: target[i].x, y: target[i].y, z: target[i].z, delay: delay + 0.05 * i, ease: Power2.easeOut });
        }
        this.timer = setTimeout(() => {
            this.state++;
            this.state = this.state > 4 ? 0 : this.state;
            let r = 3000;
            for (let i = 0; i < 49; i++) {
                TweenLite.to(this.objects[i].position, 1, { z: -r / 2 + Math.random() * r, ease: Power2.easeOut });
            }
            switch (this.state) {
                case 0:
                    this.transform(this.targets.graph1, 1, 0.3);
                    break;
                case 1:
                    this.transform(this.targets.graph2, 1, 0.3);
                    break;
                case 2:
                    this.transform(this.targets.graph3, 1, 0.3);
                    break;
                case 3:
                    this.transform(this.targets.graph4, 1, 0.3);
                    break;
                case 4:
                    this.transform(this.targets.graph5, 1, 0.3);
                    break;
            }
        }, 1000 * 10);
    }

    animate() {
        this.Framer = requestAnimationFrame(() => { this.animate() });
        this.renderer.render(this.scene, this.camera);
    }

    onWindowResize() {
        // this.camera.aspect = window.innerWidth / maxH;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, this.maxH);
        this.renderer.render(this.scene, this.camera);
    }

    // 清理
    destroy() {
        clearTimeout(this.timer);
        cancelAnimationFrame(this.Framer);
        this.timer = undefined;
        this.Framer = undefined;
        for (let i = 0; i < this.flash.length; i++) {
            this.flash[i].destroy();
        }
        for (let ii = 0; ii < 49; ii++) {
            TweenLite.killTweensOf(this.objects[ii].position);
        }
        TweenLite.killTweensOf(this.area3D.rotation);
        this.flash.length = 0;
        this.objects.length = 0;
        // threeJS
        this.renderer.domElement.addEventListener('dblclick', null, false);
        while (this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[this.scene.children.length - 1]);
        }
        this.scene = null;
        this.camera = null;
        this.area3D = null;
    }

}