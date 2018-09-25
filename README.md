# aframe

## aframe-fbx-material

```<script src="https://unpkg.com/aframe-extras@4.2.0/src/loaders/fbx-model.js"></script>
<script src="https://unpkg.com/three@0.95.0/examples/js/libs/inflate.min.js"></script>

<a-assets>
    <img id="model-fbx" src="./assets/model.fbx">
    <img id="model-mat" src="./assets/model.mat">
    <img id="model-base" src="./assets/modelBase.jpg">
    <img id="model-normal" src="./assets/modelNormal.jpg">
    <img id="model-roughness" src="./assets/modelRoughness.jpg">
</a-assets>

<a-entity
    id="basic"
    fbx-model="src: #model-base"
></a-entity>

<a-entity
    id="advanced"
    fbx-model="src: #model-fbx"
    fbx-material="src: #model-base; normal: #model-normal; roughness: #model-roughness; 
></a-entity>```