window.Bullet = (function () {
  "use strict";
  function Bullet(scene, enemyToFire, player, sceneObjects) {
    this.BULLET_SIZE = 50;
    this.SPEED = 20;

    this.scene = scene;
    this.enemyToFire = enemyToFire;
    this.player = player;
    this.sceneObjects = sceneObjects;

    var material = new THREE.MeshBasicMaterial({shading: THREE.FlatShading, color: 0xFFFFFF});
    material.color.setRGB(Math.random(), Math.random(), Math.random());
    this.threeObject = new THREE.Mesh(new THREE.CubeGeometry(this.BULLET_SIZE, this.BULLET_SIZE, this.BULLET_SIZE ), material);

    this.threeObject.enemyToFire = this.enemyToFire;
    this.threeObject.position.x = this.enemyToFire.position.x;
    this.threeObject.position.z = this.enemyToFire.position.z;

    var pLocal = new THREE.Vector3(0, 0, -1);
    var pWorld = pLocal.applyMatrix4(this.player.matrixWorld);
    var dir = pWorld.sub(this.threeObject.position).normalize();

    this.direction = dir;
    this.direction.multiplyScalar(this.SPEED);

    this.sceneObjects.allBullets.push(this);
    this.scene.add(this.threeObject);
  }

  Bullet.prototype.update = function() {
    this.threeObject.position.add(this.direction);
    if (this.falling) {
      this.threeObject.position.y -= 10;

      if(this.threeObject.position.y < -1000) {
        this.sceneObjects.removeBullet(this);
        this.scene.remove(this.threeObject);
      }
    }
  };

  Bullet.prototype.toggleFalling = function() {
    this.falling = true;
  };

  return Bullet;
})();
