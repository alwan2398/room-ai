"use client";

import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import AiPromptInput from "@/components/views/AiPromptInput";
import Header from "@/components/views/Header";
import TogglePlatform from "@/components/views/TogglePlatform";
import {
  containerVariants,
  itemVariants,
  textContainerVariants,
  wordVariants,
} from "@/constant/AnimateConst";
import { suggestionsDesign } from "@/constant/SuggestionConst";
import { useCreateProject } from "@/hooks/use-create-project";
import { motion } from "framer-motion";
import { useState } from "react";

const Home = () => {
  const [promptText, setPromptText] = useState<string>("");
  const [platformValue, setPlatformValue] = useState<string>("website");
  const { mutate: createProject, isPending } = useCreateProject();

  const handleSuggestionClick = (value: string) => {
    setPromptText(value);
  };

  const handleSubmit = () => {
    // Map toggle value to schema type
    const type = platformValue === "application" ? "app" : "website";
    createProject({ prompt: promptText, type });
  };

  const text1 = "Desain Website Dan Aplikasi".split(" ");
  const text2 = "Dengan Cepat.".split(" ");

  return (
    <div className="w-full min-h-screen">
      <div className="flex flex-col">
        <Header />
        <main className="relative overflow-hidden pt-28 pb-10">
          <section className="max-w-7xl mx-auto flex flex-col items-center justify-center px-5 md:px-0">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="w-full flex flex-col items-center"
            >
              <div className="space-y-4 text-center">
                <motion.h1
                  variants={textContainerVariants}
                  className="font-semibold text-4xl tracking-tight sm:text-5xl"
                >
                  <span className="inline-block">
                    {text1.map((word, i) => (
                      <motion.span
                        key={i}
                        variants={wordVariants}
                        className="inline-block mr-[0.2em] last:mr-0"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>{" "}
                  <br className="md:hidden" />
                  <span className="text-primary inline-block">
                    {text2.map((word, i) => (
                      <motion.span
                        key={i}
                        variants={wordVariants}
                        className="inline-block mr-[0.2em] last:mr-0"
                      >
                        {word}
                      </motion.span>
                    ))}
                  </span>
                </motion.h1>
                <motion.p
                  variants={itemVariants}
                  className="mx-auto max-w-2xl text-center text-foreground font-medium leading-relaxed sm:text-lg"
                >
                  Kami membantu Anda untuk membuat website dan aplikasi yang
                  unik dan menarik dengan desain yang modern dan responsif.
                </motion.p>
              </div>

              <motion.div variants={itemVariants} className="w-full mt-4">
                <TogglePlatform
                  value={platformValue}
                  setValue={setPlatformValue}
                />
              </motion.div>

              <motion.div variants={itemVariants} className="w-full">
                <AiPromptInput
                  className="ring-2 ring-primary mt-6"
                  promptText={promptText}
                  setPromptText={setPromptText}
                  onSubmit={handleSubmit}
                  isLoading={isPending}
                />
              </motion.div>

              <motion.div
                variants={itemVariants}
                className="flex flex-wrap justify-center gap-2 px-5 mt-6"
              >
                <Suggestions className="justify-center">
                  {suggestionsDesign.map((suggestion) => (
                    <Suggestion
                      key={suggestion.label}
                      suggestion={suggestion.label}
                      onClick={() => handleSuggestionClick(suggestion.value)}
                      className="text-xs! h-7! px-2.5 pt-1! w-[calc(50%-4px)] md:w-auto"
                    >
                      {suggestion.icon}
                      <span>{suggestion.label}</span>
                    </Suggestion>
                  ))}
                </Suggestions>
              </motion.div>
            </motion.div>

            {/* Background Elements - Fade in separately */}
            <motion.div
              className="absolute -translate-x-1/2
             left-1/2 w-[5000px] h-[3000px] top-[80%]
             -z-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.5, ease: "easeOut" }}
            >
              <div
                className="-translate-x-1/2 absolute
               bottom-[calc(100%-300px)] left-1/2
               h-[2000px] w-[2000px]
               opacity-20 bg-radial-primary"
              ></div>
              <div
                className="absolute -mt-2.5
              size-full rounded-[50%]
               bg-primary/20 opacity-70
               [box-shadow:0_-15px_24.8px_var(--primary)]"
              ></div>
              <div
                className="absolute z-0 size-full
               rounded-[50%] bg-background"
              ></div>
            </motion.div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
