/**
 * Copyright (c) 2017-present, Viro, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Text,
  View,
  StyleSheet,
  PixelRatio,
  TouchableHighlight,
  Image,
} from 'react-native';

import {
  ViroARSceneNavigator
} from 'react-viro';

/*
 TODO: Insert your API key below
 */
var sharedProps = {
  apiKey:"4A826AEA-D3C8-4DE8-A12F-2D755BB0CAC4",
}

// Sets the default scene you want for AR and VR
var SocialARScene = require('./js/MainSceneARSocial');
var EnvARScene = require('./js/MainSceneAREnv');
var RightsARScene = require('./js/MainSceneARRights');

var UNSET = "UNSET";
var AR_NAVIGATOR_TYPE = "AR";
var SOCIAL = "S";
var ENV = "E";
var RIGHTS = "R";

// This determines which type of experience to launch in, or UNSET, if the user should
// be presented with a choice of AR or VR. By default, we offer the user a choice.
var defaultNavigatorType = UNSET;

export default class ADonate extends Component {
  constructor() {
    super();

    this.state = {
      navigatorType : defaultNavigatorType,
      sharedProps : sharedProps,
      cause: "S"
    }
    this._getExperienceSelector = this._getExperienceSelector.bind(this);
    this._getARNavigator = this._getARNavigator.bind(this);
    this._getExperienceButtonOnPress = this._getExperienceButtonOnPress.bind(this);
    this._exitViro = this._exitViro.bind(this);
  }

  // Replace this function with the contents of _getVRNavigator() or _getARNavigator()
  // if you are building a specific type of experience.
  render() {
    if (this.state.navigatorType == UNSET) {
      return this._getExperienceSelector();
    } else if (this.state.navigatorType == AR_NAVIGATOR_TYPE) {
      return this._getARNavigator(this.state.organization);
    }
  }

  // Presents the user with a choice of an AR or VR experience
  _getExperienceSelector() {
    return (
      <View style={localStyles.outer} >
        <View style={localStyles.inner} >

          <Text style={localStyles.titleText}>
            Choose the cause you would like to donate to:
          </Text>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE, "Unicef", ENV)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>World Wildlife Fund {"\n"}(WWF)</Text>
            {/* <Image source={require('./img/unicef.jpg')}  style={localStyles.img}/> */}
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE, "Amnesty International", SOCIAL)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>Doctors Without {"\n"}Borders</Text>
          </TouchableHighlight>

          <TouchableHighlight style={localStyles.buttons}
            onPress={this._getExperienceButtonOnPress(AR_NAVIGATOR_TYPE, "Amnesty International", RIGHTS)}
            underlayColor={'#68a0ff'} >

            <Text style={localStyles.buttonText}>Amnesty International</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }

  // Returns the ViroARSceneNavigator which will start the AR experience
  _getARNavigator(organization) {
    if (this.state.cause === ENV){
      return (
        <ViroARSceneNavigator {...this.state.sharedProps}
          initialScene={{scene: EnvARScene}} />
      );
    } else if (this.state.cause === RIGHTS){
      return (
        <ViroARSceneNavigator {...this.state.sharedProps}
          initialScene={{scene: RightsARScene}} />
      );
    } else if (this.state.cause === SOCIAL){
      return (
        <ViroARSceneNavigator {...this.state.sharedProps}
          initialScene={{scene: SocialARScene}} />
      );
    }
  }

  // This function returns an anonymous/lambda function to be used
  // by the experience selector buttons
  _getExperienceButtonOnPress(navigatorType, organization, cause) {
    return () => {
      this.setState({
        navigatorType : navigatorType,
        organization: organization,
        cause: cause
      })
    }
  }

  // This function "exits" Viro by setting the navigatorType to UNSET.
  _exitViro() {
    this.setState({
      navigatorType : UNSET
    })
  }
}

var localStyles = StyleSheet.create({

  viroContainer :{
    flex : 1,
    backgroundColor: "black",
  },
  outer : {
    flex : 1,
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: "black",
  },
  inner: {
    flex : 1,
    flexDirection: 'column',
    alignItems:'center',
    backgroundColor: "black",
  },
  titleText: {
    paddingTop: 10,
    paddingBottom: 20,
    color:'#fff',
    textAlign:'center',
    fontSize : 25
  },
  buttonText: {
    color:'#fff',
    textAlign:'center',
    fontSize : 20
  },
  buttons : {
    height: 100,
    width: 200,
    paddingTop:20,
    paddingBottom:20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  },
  exitButton : {
    height: 50,
    width: 100,
    paddingTop:10,
    paddingBottom:10,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor:'#68a0cf',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
  }
});

module.exports = ADonate
