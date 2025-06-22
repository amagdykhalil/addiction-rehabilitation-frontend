import { Feather } from "lucide-react";

const SplashScreen = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-secondary to-background text-center p-4">
      <div
        className="animate-fade-in-up transition-transform hover:scale-110 duration-300"
        style={{ animationDelay: "0.2s" }}
      >
        <Feather className="h-24 w-24 text-teal-600" />
      </div>
      <h1
        className="text-5xl font-bold text-foreground mt-6 animate-fade-in-up hover:text-primary transition-colors duration-300"
        style={{ animationDelay: "0.4s" }}
      >
        SerenePath
      </h1>
      <p
        className="text-xl text-muted-foreground mt-2 animate-fade-in-up hover:text-foreground transition-colors duration-300"
        style={{ animationDelay: "0.6s" }}
      >
        Your journey to recovery starts here.
      </p>
    </div>
  );
};

export default SplashScreen;
