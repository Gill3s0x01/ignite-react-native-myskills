import React, { useEffect } from "react";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
  FlatList,
  KeyboardAvoidingView,
  Alert,
} from "react-native";

import { Button } from "../components/Button";
import { SkillCard } from "../components/SkillCard";

interface SkillData {
  id: string;
  name: string;
}

export function Home() {
  const [newSkill, setNewSkill] = useState("");
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [gretting, setGretting] = useState("");

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    };

    setMySkills((oldState) => [...oldState, data]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills((oldState) => oldState.filter((skill) => skill.id !== id));
  }

  const applyMoneyMaskUSD = (value: string = "") => {
    const onlyNumbers = /\D/g;
    const cent = /^(\d{1,})(\d{2})$/g;
    const money = /(\d)(?=(\d{3})+\.\d{2,})/g;
    return value
      .replace(onlyNumbers, "")
      .replace(cent, "$1.$2")
      .replace(money, "$1,");
  };

  //Formatting the money
  const applyMoneyMaskEUR = (value = "") => {
    const onlyNumbers = /\D/g;
    const cent = /^(\d{1,})(\d{2})$/g;
    const money = /(\d)(?=(\d{3})+\.\d{2,})/g;
    return value
      .replace(onlyNumbers, "")
      .replace(cent, "€1,€2")
      .replace(money, "€1,");
  };
  //Formatting the money
  const applyMoneyMaskGBP = (value = "") => {
    const onlyNumbers = /\D/g;
    const cent = /^(\d{1,})(\d{2})$/g;
    const money = /(\d)(?=(\d{3})+\.\d{2,})/g;
    return value
      .replace(onlyNumbers, "")
      .replace(cent, "£1.£2")
      .replace(money, "£1,");
  };
  //Formatting the money
  const applyMoneyMaskCHF = (value = "") => {
    const onlyNumbers = /\D/g;
    const cent = /^(\d{1,})(\d{2})$/g;
    const money = /(\d)(?=(\d{3})+\.\d{2,})/g;
    return value

      .replace(onlyNumbers, "")
      .replace(cent, "CHF1,CHF2")
      .replace(money, "CHF1,");
  };
  //Formatting the money
  const applyMoneyMaskCAD = (value = "") => {
    const onlyNumbers = /\D/g;
    const cent = /^(\d{1,})(\d{2})$/g;
    const money = /(\d)(?=(\d{3})+\.\d{2,})/g;
    return value
      .replace(onlyNumbers, "")
      .replace(cent, "CAD1,CAD2")
      .replace(money, "CAD1,");
  };
  //Formatting the money
  const applyMoneyMaskAUD = (value = "") => {
    const onlyNumbers = /\D/g;
    const cent = /^(\d{1,})(\d{2})$/g;
    const money = /(\d)(?=(\d{3})+\.\d{2,})/g;
    return value
      .replace(onlyNumbers, "")
      .replace(cent, "AUD1,AUD2")
      .replace(money, "AUD1,");
  };

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGretting("Good morning");
    } else if (currentHour >= 12 && currentHour < 18) {
      setGretting("Good afternoon");
    } else {
      setGretting("Good night");
    }
  }, []);

  return (
    <KeyboardAvoidingView style={styles.container}>
      <Text style={styles.title}>Welcome, Gilles</Text>

      <Text style={styles.greetings}>{gretting}</Text>

      <TextInput
        style={styles.input}
        placeholder="New skill"
        placeholderTextColor="#555"
        onChangeText={setNewSkill}
        keyboardType="numeric"
        returnKeyType="done"
        autoFocus={true}
      />
      <Button
        onPress={handleAddNewSkill}
        title="Add"
        color="#fff"
        fontSize={12}
      />
      <Button
        onPress={() => {
          Alert.alert(
            "Remove skill",
            "Are you sure you want to remove this skill?",
            [
              {
                text: "Cancel",
                onPress: () => console.log("Cancel Pressed"),
                style: "cancel",
              },
              {
                text: "Remove",
                onPress: () => handleRemoveSkill(mySkills[0].id),
                style: "destructive",
              },
            ],
            { cancelable: true }
          );
        }}
        title="Remove"
        fontSize={12}
      />
      <FlatList
        data={mySkills}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <SkillCard
            id={item.id}
            name={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
      <Text style={styles.total}>
        <Text style={styles.totalTitle}>Total: </Text>
      </Text>
      <Text style={styles.totalValue}></Text>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121015",
    paddingVertical: 70,
    paddingHorizontal: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    paddingTop: 10,
    paddingBottom: 10,
  },
  greetings: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  total: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 30,
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  totalTitle: {
    fontSize: 16,
    color: "#fff",
  },
  totalValue: {
    fontSize: 20,
    color: "#fff",
  },
});
