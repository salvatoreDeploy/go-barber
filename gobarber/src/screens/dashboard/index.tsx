import React from "react";

import { View } from "react-native";
import { Button } from "../../components/Button";
import { useAuth } from "../../hooks/AuthContext";

export function Dashboard() {
  const { signOut } = useAuth();

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 30 }}>
      <Button onPress={signOut}>Sair</Button>
    </View>
  );
}
