import { StatusBar } from 'expo-status-bar';
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import {Picker} from '@react-native-picker/picker';

export default function App() {
  const [enteredWeight, setEnteredWeight] = useState("");
  const [resultWeight, setResultWeight] = useState(" ");
  const [selectedValue, setSelectedValue] = useState("kgToPound");
  const [placeHolderText, setPlaceHolderText] =  useState("Weight in kgs")
  const [isKgConversion,setIsKgConversion] = useState(true);
  

  const kgInputHandler = (enteredKg) => {
    setEnteredWeight(enteredKg);
  };

  const weightTypeHandler = (value, index) => {
    setSelectedValue(value);
    if (index === 0) {
      setIsKgConversion(true)
      setPlaceHolderText("Weight in kgs");
    } else {
      setIsKgConversion(false)
      setPlaceHolderText("Weight in pounds");
    }
  }

  const calculateWeightHandler = () => {
    let weight = +enteredWeight;
    if (isKgConversion) {
      weight = weight / 0.45359237;
      setResultWeight(`Weight :${weight.toFixed(2)} pounds`);  
    } else {
      weight = weight * 0.45359237;
      setResultWeight(`Weight :${weight.toFixed(2)} kgs`);  
    }
  };

  const resetWeightHandler = () => {
    setEnteredWeight("");
    setResultWeight(" ");
  };  


  return (
    <View style={styles.inputContainer}>
      <Picker
        selectedValue={selectedValue}
        style={{ height: 50, width: 150 }}
        onValueChange={weightTypeHandler}
      >
        <Picker.Item label="Kgs" value="kgToPound" />
        <Picker.Item label="Pounds" value="poundToKg" />
      </Picker>


      <TextInput
        placeholder={placeHolderText}
        style={styles.input}
        onChangeText={kgInputHandler}
        value={enteredWeight}
      />
      <Text style={styles.resultWeight}>{resultWeight}</Text>
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Calculate"
            color="green"
            onPress={calculateWeightHandler}
          />
        </View>
        <View style={styles.button}>
          <Button 
            title="Reset" 
            color='green'
            onPress={resetWeightHandler} />
        </View>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: "70%",
    borderColor: "black",
    borderWidth: 1,
    padding: 5,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
  },
  button: {
    width: "40%",
  },
  radioButtonContainer: {
    width: "60%",
  },
  radioButton: {
    width: "20%",
  },
  resultWeight:{
    fontWeight:'bold',
    fontSize:20,
    marginBottom:5,
  }
});
