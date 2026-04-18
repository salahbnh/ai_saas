"use client";

import { useEffect, useState } from "react";
import { Eye, EyeOff, Key } from "lucide-react";
import { Input } from "@/components/ui/input";

const STORAGE_KEY = "nexusai-user-api-key";

/**
 * Shared BYOK input — persists the user-provided API key in localStorage
 * so they don't have to re-enter it on every page navigation.
 */
export function useUserApiKey() {
  const [apiKey, setApiKey] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setApiKey(stored);
  }, []);

  const updateKey = (key: string) => {
    setApiKey(key);
    if (key.trim()) {
      localStorage.setItem(STORAGE_KEY, key.trim());
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  };

  return [apiKey, updateKey] as const;
}

type Props = {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  className?: string;
};

export function ApiKeyInput({ value, onChange, disabled, className }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <div className={className}>
      <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
        <Key className="h-3 w-3" />
        API Key
        <span className="text-muted-foreground/60">(optional — use your own key to test)</span>
      </label>
      <div className="relative">
        <Input
          type={visible ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="sk-... or gsk_... or any provider key"
          disabled={disabled}
          autoComplete="off"
          className="pr-9"
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors duration-150 hover:text-foreground cursor-pointer"
          aria-label={visible ? "Hide key" : "Show key"}
          tabIndex={-1}
        >
          {visible ? (
            <EyeOff className="h-3.5 w-3.5" />
          ) : (
            <Eye className="h-3.5 w-3.5" />
          )}
        </button>
      </div>
      {value.trim() && (
        <p className="mt-1 text-[10px] text-emerald-600 dark:text-emerald-400">
          Using your API key. It stays in your browser only.
        </p>
      )}
    </div>
  );
}
