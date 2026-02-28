"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { Link } from "@/i18n/navigation";
import { faqCategories, getFaqByCategory, type FaqCategory } from "@/content/faq";

interface FaqModeProps {
  onBack: () => void;
  onSwitchToLead: () => void;
}

type FaqStep = "category" | "question" | "answer";

export default function FaqMode({ onBack, onSwitchToLead }: FaqModeProps) {
  const t = useTranslations("assistant");
  const locale = useLocale() as "fr" | "en";
  const [step, setStep] = useState<FaqStep>("category");
  const [category, setCategory] = useState<FaqCategory | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isOther, setIsOther] = useState(false);

  const questions = category ? getFaqByCategory(category, locale) : [];
  const selectedFaq = questions.find((q) => q.id === selectedId);

  function handleCategorySelect(cat: FaqCategory) {
    setCategory(cat);
    setSelectedId(null);
    setIsOther(false);
    setStep("question");
  }

  function handleQuestionSelect(id: string) {
    setSelectedId(id);
    setIsOther(false);
    setStep("answer");
  }

  function handleOther() {
    setSelectedId(null);
    setIsOther(true);
    setStep("answer");
  }

  function handleBackToQuestions() {
    setStep("question");
    setSelectedId(null);
    setIsOther(false);
  }

  function handleBackToCategories() {
    setStep("category");
    setCategory(null);
    setSelectedId(null);
    setIsOther(false);
  }

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Category selection */}
      {step === "category" && (
        <>
          <p className="text-sm font-medium">{t("faq.selectCategory")}</p>
          <div className="flex flex-col gap-1.5">
            {faqCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategorySelect(cat)}
                className="text-left px-3 py-2.5 text-sm border border-border rounded-md hover:border-accent hover:text-accent transition-colors"
              >
                {t(`faq.categories.${cat}`)}
              </button>
            ))}
          </div>
          <button
            onClick={onBack}
            className="text-xs text-muted hover:text-foreground transition-colors self-start"
          >
            ← {t("back")}
          </button>
        </>
      )}

      {/* Question selection */}
      {step === "question" && (
        <>
          <p className="text-sm font-medium">
            {t(`faq.categories.${category}`)} — {t("faq.selectQuestion")}
          </p>
          <div className="flex flex-col gap-1.5">
            {questions.map((q) => (
              <button
                key={q.id}
                onClick={() => handleQuestionSelect(q.id)}
                className="text-left px-3 py-2.5 text-sm border border-border rounded-md hover:border-accent hover:text-accent transition-colors break-words"
              >
                {q.question}
              </button>
            ))}
            <button
              onClick={handleOther}
              className="text-left px-3 py-2.5 text-sm border border-border rounded-md hover:border-accent hover:text-accent transition-colors italic text-muted"
            >
              {t("faq.otherQuestion")}
            </button>
          </div>
          <button
            onClick={handleBackToCategories}
            className="text-xs text-muted hover:text-foreground transition-colors self-start"
          >
            ← {t("back")}
          </button>
        </>
      )}

      {/* Answer display */}
      {step === "answer" && (
        <>
          {selectedFaq && !isOther ? (
            <>
              <div className="bg-foreground/[0.03] rounded-md p-3">
                <p className="text-sm font-medium mb-2">{selectedFaq.question}</p>
                <p className="text-sm text-muted leading-relaxed">
                  {selectedFaq.answer}
                </p>
              </div>

              {selectedFaq.links.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-muted mb-1.5">
                    {t("faq.relatedLinks")}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedFaq.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="text-xs px-2.5 py-1 border border-border rounded-full hover:border-accent hover:text-accent transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div className="bg-foreground/[0.03] rounded-md p-3">
              <p className="text-sm text-muted leading-relaxed">
                {t("faq.noAnswer")}
              </p>
            </div>
          )}

          <button
            onClick={onSwitchToLead}
            className="w-full px-3 py-2.5 bg-accent text-white text-sm font-medium rounded-md hover:bg-accent/90 transition-colors"
          >
            {t("faq.talkToExpert")}
          </button>

          <button
            onClick={handleBackToQuestions}
            className="text-xs text-muted hover:text-foreground transition-colors self-start"
          >
            ← {t("faq.backToQuestions")}
          </button>
        </>
      )}
    </div>
  );
}
