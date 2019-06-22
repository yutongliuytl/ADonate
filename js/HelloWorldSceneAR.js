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
} from 'react-viro';

var createReactClass = require('create-react-class');
var HelloWorldSceneAR = createReactClass({
  getInitialState() {
    return {
      text : "Initializing AR..."
    };
  },

  render: function() {
    return (
      <ViroARScene onTrackingUpdated={()=>{this.setState({text : "Collect as much ads as possible!"})}}>
        <ViroText text={this.state.text} scale={[.05, .05, .05]} height={2} width={10} position={[0, .5, -1]} style={styles.MainTextStyle} />

        <ViroAmbientLight color={"#aaaaaa"} />
        <ViroSpotLight innerAngle={5} outerAngle={90} direction={[0,-1,-.2]} position={[0, 3, 1]} color="#ffffff" castsShadow={true} />
        <ViroNode position={[0,0,-1]} dragType="FixedToWorld" onDrag={()=>{}} >
          <Viro3DObject
            source={require('./res/emoji_smile/emoji_smile.vrx')}
            position={[0, .1, 0]}
            scale={[.2, .2, .2]}
            type="VRX" />
        </ViroNode>
        <ViroNode position={[0,0,-10]} dragType="FixedToWorld" onDrag={()=>{}} >
          <Viro3DObject source={require('./res/wish-ad/wish-ad.obj')}
              position={[0, -5, 0]}
              scale={[.05, .05, .05]}
              rotation={[-90, 0, 0]}
              type="OBJ" />
        </ViroNode>
      </ViroARScene>
    );
  },
});

var styles = StyleSheet.create({
  MainTextStyle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 50,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

module.exports = HelloWorldSceneAR;

