import { useEffect, useState } from "react";
import { Link } from "expo-router";
import { FlatList, View, ActivityIndicator, Pressable } from "react-native";
import { getLatestGames } from "../lib/metacritic";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AnimatedGameCard } from "./GameCard";
import { Logo } from "./Logo";
import { CircleInfoIcon } from "./Icons";

export default function Main() {
  const [games, setGames] = useState([]);
  const insests = useSafeAreaInsets();

  useEffect(() => {
    getLatestGames().then((games) => {
      setGames(games);
    });
  }, []);

  return (
    <View style={{ paddingTop: insests.top, paddingBottom: insests.bottom }}>
      <View style={{ marginBottom: 20 }}>
        <Logo />
      </View>
      <Link href="/about" className="text-blue-400 text-xl">
        <Pressable>
          <CircleInfoIcon />
        </Pressable>
      </Link>
      {games.length === 0 ? (
        <ActivityIndicator color={"#fff"} size={"large"} />
      ) : (
        <FlatList
          data={games}
          keyExtractor={(game) => game.slug}
          renderItem={({ item, index }) => (
            <AnimatedGameCard game={item} index={index} />
          )}
        />
      )}
    </View>
  );
}
