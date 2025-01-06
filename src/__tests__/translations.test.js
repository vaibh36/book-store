import { translations } from "../constants/translations"; // Adjust the import path as needed

describe("translations", () => {
  test("should contain all required keys for 'en' language", () => {
    const englishTranslations = translations.en;

    // Check that each key exists and has a correct value
    expect(englishTranslations).toHaveProperty("allBooks", "All Books");
    expect(englishTranslations).toHaveProperty("readBooks", "Read Books");
    expect(englishTranslations).toHaveProperty("unreadBooks", "Unread Books");
    expect(englishTranslations).toHaveProperty("bookLibrary", "Book Library");
    expect(englishTranslations).toHaveProperty("lightMode", "Light Mode");
    expect(englishTranslations).toHaveProperty("darkMode", "Dark Mode");
    expect(englishTranslations).toHaveProperty("home", "Home");
  });
});
