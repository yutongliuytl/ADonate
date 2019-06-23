'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlaneSelector,
  ViroNode,
  ViroAnimations,
  
  ViroSceneNavigator,
  ViroScene,
  Viro360Video,
  Viro360Image,
  ViroUtils,
  ViroPortal,
  ViroPortalScene,
} from 'react-viro';

var styles = StyleSheet.create({
  MainTextStyle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

var createReactClass = require('create-react-class');

var MainSceneAR = createReactClass({
  
  getInitialState() {
    return {
      scale:[.2, .2, .2],
      rotation:[0,0,0],
      text: "Initializing AR...",
      point: 0
    }
  },

  render: function() {
    return (
      <ViroARScene onTrackingUpdated={()=>{this.setState({text : "Pinch/Collect Ads to donate funds!"})}}>
        <ViroText text={this.state.text} scale={[.05, .05, .05]} height={2} width={10} position={[0, .5, -1]} style={styles.MainTextStyle} />

        <ViroText text={"You have accumulated: " + this.state.point.toString()} scale={[1, 1, 1]} height={2} width={10} position={[5, 5, -15]} style={styles.MainTextStyle} />

        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        
        <ViroPortalScene passable={true} dragType="FixedDistance" onDrag={()=>{}}>
          <ViroPortal position={[0, 0, -1]} scale={[.1, .1, .1]}>
            <Viro3DObject source={require('./ARPortals/portal_res/portal_ship/portal_ship.vrx')}
              resources={[require('./ARPortals/portal_res/portal_ship/portal_ship_diffuse.png'),
                          require('./ARPortals/portal_res/portal_ship/portal_ship_normal.png'),
                          require('./ARPortals/portal_res/portal_ship/portal_ship_specular.png')]}
              type="VRX"/>
          </ViroPortal>
          {/* <Viro360Image source={require("./ARPortals/portal_res/360_island.jpg")} /> */}
          <Viro360Image source={require("./ARPortals/portal_res/beach.jpg")} />
          {/* <Viro360Image source={require("./ARPortals/portal_res/sunset.jpg")} /> */}

          <ViroText text={"You have accumulated: " + this.state.point.toString()} scale={[0.5, 0.5, 0.5]} height={2} width={10} position={[3, 3, -10]} style={styles.MainTextStyle} />

          <ViroNode position={[0,0,-10]} dragType="FixedDistance" onDrag={()=>{}}  ref={this._setARNodeRef}>
            <Viro3DObject source={require('./res/wish-ad/wish-ad.obj')}
                position={[0, -5, 0]}
                scale={[.05, .05, .05]}
                rotation={[-90, 0, 0]}
                type="OBJ"
                onPinch={this._onPinch}
                onError={err => console.log("error: ", err)}
                // onLoadStart={this._onLoadStart}
                // onLoadEnd={this._onLoadEnd}
              />
          </ViroNode>

          <ViroNode position={[0,0,-15]} dragType="FixedDistance" onDrag={()=>{}} >
            <Viro3DObject source={require('./res/nike-ad/nike-ad.obj')}
                position={[0, -5, 0]}
                scale={[.02, .02, .02]}
                rotation={[-90, 0, 0]}
                type="OBJ"
                // onPinch={this._onPinch}
                // onError={err => console.log("error: ", err)}
                // onLoadStart={this._onLoadStart}
                // onLoadEnd={this._onLoadEnd}
              />
          </ViroNode>

          <ViroNode position={[0,0,-25]} dragType="FixedDistance" onDrag={()=>{}} >
            <Viro3DObject source={require('./res/coca-cola-ad/coca-cola-ad.obj')}
                position={[0, -5, 0]}
                scale={[.03, .03, .03]}
                rotation={[-90, 0, 0]}
                type="OBJ"
                // onPinch={this._onPinch}
                // onError={err => console.log("error: ", err)}
                // onLoadStart={this._onLoadStart}
                // onLoadEnd={this._onLoadEnd} 
              />
          </ViroNode>

          <ViroNode position={[0,0,-35]} dragType="FixedDistance" onDrag={()=>{}} >
            <Viro3DObject source={require('./res/calsberg-ad/calsberg-ad.obj')}
                position={[0, -5, 0]}
                scale={[.03, .03, .03]}
                rotation={[-90, 0, 0]}
                type="OBJ"
                // onPinch={this._onPinch}
                // onError={err => console.log("error: ", err)}
                // onLoadStart={this._onLoadStart}
                // onLoadEnd={this._onLoadEnd} 
              />
          </ViroNode>

        </ViroPortalScene>
        
      </ViroARScene>
    );
  },

  _setARNodeRef(component) {
    this.arNodeRef = component;
  },

  _onPinch(pinchState, scaleFactor, source) {
    let newScale = this.state.scale.map((x)=>{return 0})
  
    if (pinchState == 3) {
      this.setState({
        scale: newScale, 
        point: this.state.point+1
      });
  
      return;
    }
    this.arNodeRef.setNativeProps({ scale: newScale });
  },
});

module.exports = MainSceneAR;

