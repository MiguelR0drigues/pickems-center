"use client";

import * as React from "react";

import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { cn } from "../../lib/utils";
import { Button } from "./button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./command";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";

const languages = [
  {
    value: "pt",
    label: "Portuguese",
    code: "pt",
  },
  {
    value: "en",
    label: "English",
    code: "gb-eng",
  },
];

export default function Combobox() {
  const [open, setOpen] = React.useState(false);
  const [selectedLanguage, setSelectedLanguage] = React.useState("");
  const router = useRouter();

  React.useEffect(() => {
    // TODO: fetch current language and update combobox active item
    router.replace(`/${selectedLanguage}`);
  }, [router, selectedLanguage]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-10 p-2 justify-center"
        >
          <span
            className={`fi fi-${
              selectedLanguage
                ? languages.find(
                    (language) => language.value === selectedLanguage
                  )?.code || "gb-eng"
                : "gb-eng"
            }`}
          ></span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search language..." />
          <CommandEmpty>No language found.</CommandEmpty>
          <CommandGroup>
            <CommandList>
              {languages.map((language) => (
                <CommandItem
                  key={language.value}
                  value={language.value}
                  onSelect={(currentValue) => {
                    setSelectedLanguage(
                      currentValue === selectedLanguage ? "" : currentValue
                    );
                    setOpen(false);
                  }}
                  className="flex"
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedLanguage === language.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  <span className={`pl-5 fi fi-${language.code}`}>
                    {language.label}
                  </span>
                </CommandItem>
              ))}
            </CommandList>
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
