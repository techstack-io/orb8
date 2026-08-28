DEFAULT_CONCEPTS = [
    "meditation",
    "guided meditation",
    "learn to meditate",
    "meditation app",
    "meditation for stress",
    "meditation for beginners",
]


def generate_market_hypothesis(market_description: str) -> tuple[str, list[str]]:
    hypothesis = f"People are actively seeking products, guidance, or solutions in {market_description}."
    if "meditat" in market_description.lower() or "mindful" in market_description.lower():
        return hypothesis, DEFAULT_CONCEPTS
    seed = market_description.strip().lower()
    return hypothesis, [seed, f"{seed} app", f"best {seed}", f"learn {seed}", f"{seed} for beginners"]
