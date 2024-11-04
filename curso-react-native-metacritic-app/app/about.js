import { Pressable, ScrollView, Text } from "react-native";
import { Link } from "expo-router";
import { HomeIcon } from "../components/Icons";

import { styled } from "nativewind";

const StylePressable = styled(Pressable);

export default function About() {
  return (
    <ScrollView className="pt-24">
      <Link asChild href="/">
        <Pressable>
          <StylePressable className={`active:opacity-20`}>
            <HomeIcon />
          </StylePressable>
        </Pressable>
      </Link>

      <Text className="text-white font-bold mb-8 text-2xl">
        Sobre el proyecto
      </Text>

      <Text className="text-white text-white/90 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        pharetra feugiat urna, eget pellentesque arcu fermentum eu. Ut lobortis
        libero dolor. Mauris egestas, nunc ut aliquet blandit, felis lorem
        consequat arcu, vitae euismod nibh lorem quis dolor.
      </Text>

      <Text className="text-white text-white/90 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        pharetra feugiat urna, eget pellentesque arcu fermentum eu. Ut lobortis
        libero dolor. Mauris egestas, nunc ut aliquet blandit, felis lorem
        consequat arcu, vitae euismod nibh lorem quis dolor.
      </Text>

      <Text className="text-white text-white/90 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        pharetra feugiat urna, eget pellentesque arcu fermentum eu. Ut lobortis
        libero dolor. Mauris egestas, nunc ut aliquet blandit, felis lorem
        consequat arcu, vitae euismod nibh lorem quis dolor.
      </Text>

      <Text className="text-white text-white/90 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        pharetra feugiat urna, eget pellentesque arcu fermentum eu. Ut lobortis
        libero dolor. Mauris egestas, nunc ut aliquet blandit, felis lorem
        consequat arcu, vitae euismod nibh lorem quis dolor.
      </Text>

      <Text className="text-white text-white/90 mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
        pharetra feugiat urna, eget pellentesque arcu fermentum eu. Ut lobortis
        libero dolor. Mauris egestas, nunc ut aliquet blandit, felis lorem
        consequat arcu, vitae euismod nibh lorem quis dolor.
      </Text>
    </ScrollView>
  );
}
