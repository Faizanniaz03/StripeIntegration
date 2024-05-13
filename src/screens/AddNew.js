import { Alert, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomTI from '../components/CustomTI'
import { RegularFont, black, primaryColor, white } from '../utils/Style'
import { auth } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import CustomButton from '../components/CustomButton'

const AddNew = ({navigation}) => {
  const [invoice,setInvoice] = useState('')
  const[markup,setMarkup] = useState('')
  const [finalAmount,setFinalAmount] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [Address, setAddress] = useState('')
  const [downPay, setDownPay] = useState('')
  const [receiveable, setReceiveable] = useState('')
  const [duration, setDuration] = useState('')
  const [installment, setInstallment] = useState('')
  const [Product, setProduct] = useState('')
  const addMarkup = ()=>{
   const Total =  invoice * (1 + markup / 100);
   setFinalAmount(Total)
  }
  const calculateNewFinal = ()=>{
    const newFinal = finalAmount - downPay
    setReceiveable(newFinal)
  }
  const calculateInstallment = ()=>{
    const monthlyInstallment = receiveable/duration
    setInstallment(monthlyInstallment)
  }
  const saveData = ()=>{
    if (name=='') {
    Alert.alert('Name cannot be Empty')
  }
  else if (phone=='') {
    Alert.alert('Phone Cannot be Empty')
  }
  else if (Address=='') {
    Alert.alert('Address Cannot be Empty')
  }
  else if (invoice=='') {
    Alert.alert('invoice Cannot be Empty')
  }
  else if (duration=='') {
    Alert.alert('Duration Cannot be Empty')
  }
  else{
    firestore()
  .collection('CustomersData')
  .doc(name)
  .set({
    name: name,
    address:Address,
    phone:phone,
    totalReceivable:receiveable,
    Duration:duration,
    installment:installment,
    markup:markup,
    downPay:downPay,
    product:Product,
    invoice:invoice,
    total:receiveable
  })
  .then(() => {
    Alert.alert('Customer Info added!');
    setInvoice('')
    setMarkup('')
    setFinalAmount('')
    setName('')
    setPhone('')
    setAddress('')
    setDownPay('')
    setReceiveable('')
    setDuration('')
    setInstallment('')
  })
  .then(()=>{
    navigation.navigate('Dashboard')
  })
  .catch(err=>Alert.alert(err))
  }
    
  }
  useEffect(()=>{
    addMarkup()
  },[markup,invoice])
  useEffect(()=>{
    calculateNewFinal()
  },[downPay])
  useEffect(()=>{
    calculateInstallment()
  },[duration])
  const {height,width} = useWindowDimensions()
  return (
    <ScrollView style={{
      height:height,
      width:width
    }}>
      <Text style={{
            fontSize: 30,
            color: primaryColor,
            fontFamily: RegularFont,
            textAlign: 'center',
            margin: 20
        }}>
          Add a New Customer's Info
        </Text>
      <KeyboardAvoidingView behavior='padding' keyboardVerticalOffset={-20}>
      <CustomTI title={'Enter Name of Costumer'} onChange={(val)=>setName(val)} val={name}/>
      <CustomTI title={'Enter Phone Number'} onChange={(val)=>setPhone(val)} val={phone}/>
      <CustomTI title={'Enter Address'} onChange={(val)=>setAddress(val)} val={Address}/>
      <CustomTI title={'Enter Product Name'} onChange={(val)=>setProduct(val)} val={Product}/>
      <CustomTI title={'Enter Invoice Rate'} onChange={(val)=>setInvoice(val)} />
      <CustomTI title={'Enter MarkUp in %'} onChange={(val)=>setMarkup(val)} val={markup} />
      <View style={styles.final}>
      <Text style={{fontSize:20,color:black}}>{finalAmount}</Text>
      </View>
      <CustomTI title={'Enter DownPayment'} onChange={(val)=>setDownPay(val)} val={downPay} />
      <View style={styles.final}>
      <Text style={{fontSize:20,color:black}}>{receiveable}</Text>
      </View>
      <CustomTI title={'Enter Duration in Months'} onChange={(val)=>setDuration(val)} val={duration} />
      <View style={styles.final}>
      <Text style={{fontSize:20,color:black}}> Your Monthly Installment is {Math.ceil(installment)}</Text>
      </View>
      <CustomButton action={saveData} title={'Save Info'}/>
      </KeyboardAvoidingView>
    </ScrollView>
  )
}

export default AddNew

const styles = StyleSheet.create({
  final:{
  width:'90%',
  borderColor:primaryColor,
  borderWidth:3,
  alignSelf:'center',
  margin:10,
  borderRadius:10,
  padding:12,
  fontSize:18,
  backgroundColor:white
}
})