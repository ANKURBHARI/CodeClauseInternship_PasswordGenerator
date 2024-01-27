import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.InputMismatchException;
import java.util.Scanner;

public class PasswordManager {

    private static Scanner scanner = new Scanner(System.in);
    private static ArrayList<String> generatedPasswords = new ArrayList<>();
    private static ArrayList<String> storedPasswords = new ArrayList<>();
    private static SecureRandom secureRandom = new SecureRandom();

    public static void main(String[] args) {
        showMenu();
    }

    private static void showMenu() {
        int choice;
        do {
            System.out.println("\n----- Password Manager Menu -----");
            System.out.println("1. Generate Random Passwords");
            System.out.println("2. Store Generated Passwords");
            System.out.println("3. View Stored Passwords");
            System.out.println("4. Search for Password");
            System.out.println("5. Exit");
            System.out.print("Enter your choice: ");

            choice = readIntegerInput();
            
            switch (choice) {
                case 1:
                    generateAndDisplayPasswords();
                    break;
                case 2:
                    storeGeneratedPasswords();
                    break;
                case 3:
                    viewStoredPasswords();
                    break;
                case 4:
                    searchForPassword();
                    break;
                case 5:
                    System.out.println("Exiting the Password Manager. Goodbye!");
                    break;
                default:
                    System.out.println("Invalid choice. Please try again.");
            }
        } while (choice != 5);
    }

    private static int readIntegerInput() {
        int input = 0;
        while (true) {
            try {
                input = scanner.nextInt();
                scanner.nextLine(); // Consume the newline character
                break;
            } catch (InputMismatchException e) {
                System.out.println("Invalid input. Please enter a number.");
                scanner.nextLine(); // Consume the invalid input
            }
        }
        return input;
    }

    private static void generateAndDisplayPasswords() {
        System.out.print("How many passwords do you want to generate: ");
        int total = readIntegerInput();

        System.out.print("How many characters long do you want your random passwords to be: ");
        int length = readIntegerInput();

        System.out.println("\nGenerated Passwords:");
        for (int i = 0; i < total; i++) {
            String randomPassword = generateRandomPassword(length);
            generatedPasswords.add(randomPassword);
            System.out.println("Password " + (i + 1) + ": " + randomPassword +
                    ", Strength: " + getPasswordStrength(randomPassword));
        }
    }

    private static String generateRandomPassword(int length) {
        StringBuilder password = new StringBuilder();
        String characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()-_=+";
        for (int i = 0; i < length; i++) {
            password.append(characters.charAt(secureRandom.nextInt(characters.length())));
        }
        return password.toString();
    }

    private static void storeGeneratedPasswords() {
        if (!generatedPasswords.isEmpty()) {
            storedPasswords.addAll(generatedPasswords);
            System.out.println("Generated passwords stored successfully!");
            generatedPasswords.clear(); // Clear the generated passwords list
        } else {
            System.out.println("No generated passwords to store.");
        }
    }

    private static void viewStoredPasswords() {
        System.out.println("\nStored Passwords:");
        if (storedPasswords.isEmpty()) {
            System.out.println("No passwords stored yet.");
        } else {
            for (int i = 0; i < storedPasswords.size(); i++) {
                System.out.println((i + 1) + ": " + storedPasswords.get(i));
            }
        }
    }

    private static void searchForPassword() {
        System.out.print("Enter the password to search for: ");
        String searchPassword = scanner.nextLine();
        if (storedPasswords.contains(searchPassword)) {
            System.out.println("Password found in stored passwords!");
        } else {
            System.out.println("Password not found in stored passwords.");
        }
    }

    private static String getPasswordStrength(String password) {
       
        if (password.length() < 8) {
            return "Weak";
        } else if (password.length() < 12) {
            return "Moderate";
        } else {
            return "Strong";
        }
    }
}
