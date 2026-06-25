import java.util.Arrays;
import java.util.Comparator;

public class EcommerceSearch {

    public static void main(String[] args) {

        Product[] products = {

                new Product(101, "Laptop", "Electronics"),
                new Product(102, "Mobile", "Electronics"),
                new Product(103, "Shoes", "Fashion"),
                new Product(104, "Watch", "Accessories"),
                new Product(105, "Headphones", "Electronics")
        };

        String target = "Watch";

        // Linear Search

        Product linearResult =
                SearchAlgorithms.linearSearch(products, target);

        System.out.println("Linear Search Result:");

        if (linearResult != null) {
            System.out.println(linearResult);
        } else {
            System.out.println("Product not found");
        }

        // Sort for Binary Search

        Arrays.sort(products,
                Comparator.comparing(Product::getProductName));

        Product binaryResult =
                SearchAlgorithms.binarySearch(products, target);

        System.out.println("\nBinary Search Result:");

        if (binaryResult != null) {
            System.out.println(binaryResult);
        } else {
            System.out.println("Product not found");
        }
    }
}