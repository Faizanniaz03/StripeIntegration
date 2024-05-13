import React, { useState } from 'react';
import { StyleSheet, Text, View, useWindowDimensions, TextInput, Alert } from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomTI from '../components/CustomTI';
import PasswordTI from '../components/PasswordTI';
import CustomButton from '../components/CustomButton';
import { RegularFont, primaryColor } from '../utils/Style';

const ForgetPW = ({navigation}) => {
    const [phone, setPhone] = useState("+92"+'');
    const [verificationCode, setVerificationCode] = useState('');
    const [isCodeSent, setIsCodeSent] = useState(false);
    const [password, setPassword] = useState('');
    const [secureEntry, setSecureEntry] = useState(true);
    const [confirmation, setConfirmation] = useState(null);


    const { height, width } = useWindowDimensions();

    const handleSendVerificationCode = async () => {
        try {
            const confirmation = await auth().signInWithPhoneNumber(phone);
            setIsCodeSent(true);
            setConfirmation(confirmation);
            setPhone('')
            setVerificationCode('') // Save the confirmation object to use it later
        } catch (error) {
            Alert.alert('Error', error.message);
        }
    };
    

    const handleVerifyCode = async () => {
        if (confirmation) {
            try {
                const credential = auth.PhoneAuthProvider.credential(
                    confirmation.verificationId,
                    verificationCode
                );
                await auth().signInWithCredential(credential);
                Alert.alert('Success', 'Phone number verified');
                navigation.replace('Login')
            } catch (error) {
                Alert.alert('Error', error.message);
            }
        } else {
            Alert.alert('Error', 'Confirmation not found.');
        }
    };
    
    return (
        <View style={{ height: height, width: width }}>
            <View style={styles.subView}>
                <Text style={styles.welcomeText}>Verify Your Phone Number</Text>
            </View>
            <View style={styles.subViewTwo}>
                
                {isCodeSent ? (
                    <>
                        <CustomTI
                            title={'Enter Verification Code'}
                            onChange={(val) => setVerificationCode(val)}
                            val={verificationCode}
                        />
                        <CustomButton title={'Verify Code'} action={handleVerifyCode} />
                    </>
                ) : (
                    <><CustomTI
                            title={'Enter Your Phone Number'}
                            onChange={(val) => setPhone(val)}
                            val={phone} />
                    <CustomButton title={'Send  Code'} action={handleSendVerificationCode} /></>
                )}
            </View>
        </View>
    );
};

export default ForgetPW;

const styles = StyleSheet.create({
    subView: {
        height: '35%',
        justifyContent: 'flex-end',
        marginBottom: 20,
    },
    welcomeText: {
        textAlign: 'center',
        fontSize: 40,
        fontFamily: RegularFont,
        color: primaryColor,
    },
    subViewTwo: {
        justifyContent: 'flex-start',
        height: '55%',
    },
});
