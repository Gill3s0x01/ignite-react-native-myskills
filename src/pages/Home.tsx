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
  Keyboard,
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
    Keyboard.dismiss();

    setMySkills((oldState) => [...oldState, data]);
  }

  function handleRemoveSkill(id: string) {
    setMySkills((oldState) => oldState.filter((skill) => skill.id !== id));
  }

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
        keyboardType="default"
        autoFocus={true}
        onBlur={() => Keyboard.dismiss()}
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
            skill={item.name}
            onPress={() => handleRemoveSkill(item.id)}
          />
        )}
      />
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
