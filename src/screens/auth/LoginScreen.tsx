import React, { useState } from "react";
import { useRouter } from "expo-router";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

import { Button } from "../../components/buttons";
import { Colors } from "../../constants/Colors";
import { Input } from "../../components/Input";


const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Email invalide").required("Email requis"),
  password: Yup.string().required("Mot de passe requis"),
});

const LoginScreen = () => {
  const router = useRouter();
  const [pwdVisibility, setPwdVisibility] = useState(false);


const handleLoginLocal = (values: any) => {
  console.log("Connexion réussie :", values);
  
  router.replace("/(tabs)"); 
};

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
     

        <Text style={styles.titleText}>Login</Text>

        <Formik
          initialValues={{ email: "karim.kekli@gmail.com", password: "123456789" }}
          validationSchema={LoginSchema}
          onSubmit={handleLoginLocal}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View style={styles.formContainer}>
             
                            <Input
      label="Email"
      placeholder="Enter your email"
      value={values.email}
      onChangeText={handleChange("email")}
      onBlur={handleBlur("email")}
      error={errors.email}
      touched={touched.email}
      keyboardType="email-address"
      autoCapitalize="none"
    />

            
 
      <Input
      label="Password"
      placeholder="Enter your password"
      value={values.password}
      onChangeText={handleChange("password")}
      onBlur={handleBlur("password")}
      error={errors.password}
      touched={touched.password}
      isPassword={true} 
    />

  
              
            

              <Button
                onPress={handleSubmit}
                buttonText="Login"
              />

            <View style={styles.signupContainer}>
              <Text style={styles.signupText}>Don't have an account? </Text>
              <TouchableOpacity onPress={() => router.push("/(auth)/signup")}>
                <Text style={styles.signupLink}>Sign Up</Text>
              </TouchableOpacity>
            </View>

          </View>
          )}
        </Formik>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: Colors.white,
  },

  scrollContainer: {
    flexGrow: 1, 
    justifyContent: 'center', 
  },
 
  titleText: {
    color: Colors.blue,
    fontSize: wp(15),
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: hp(4),
  },

  formContainer: { 
    paddingHorizontal: wp(10)
  },
  
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: hp(4),
  },

  signupText: {
    color: Colors.gray, 
    fontSize: wp(3.5) 
  },

  signupLink: {
    color: Colors.blue,
    fontWeight: "bold",
    fontSize: wp(3.8),
  },

  errorText: {
    color: "red",
    fontSize: wp(3),
    marginBottom: hp(1.5),
    marginLeft: wp(1),
  },
});

export default LoginScreen;