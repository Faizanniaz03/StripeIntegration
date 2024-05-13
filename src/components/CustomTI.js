import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { black, primaryColor, secondaryColor, white } from '../utils/Style'

const CustomTI = (props) => {
  return (
    <View>
        <TextInput placeholder={props.title}  style={{
            width:'90%',
            borderColor:primaryColor,
            borderWidth:3,
            alignSelf:'center',
            margin:10,
            borderRadius:10,
            padding:12,
            fontSize:18,
            backgroundColor:white,
            color:black
        }} placeholderTextColor={black} value={props.val}  onChangeText={props.onChange}/>
        
    </View>
  )
}

export default CustomTI

const styles = StyleSheet.create({})