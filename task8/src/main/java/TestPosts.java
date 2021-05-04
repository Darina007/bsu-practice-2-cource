import java.util.*;

public class TestPosts {
    public static List<Post> testPosts;
    static {
        testPosts = new ArrayList<>();
        testPosts.add(Post.builder()
                .author("Ivanov Ivan")
                .description("More than 76 thousand people around the world have already recovered from the disease provoked by the new coronavirus. New vaccine especially for you!\n")
                .creationDate(new Date(21, Calendar.FEBRUARY, 17))
                .validateUntil(new Date(21, Calendar.FEBRUARY, 27))
                .photoLink("https://www.pressball.by/images/stories/2020/03/20200310231542.jpg")
                .hashTags(new ArrayList<>(Arrays.asList("krone", "virus", "vaccine")))
                .likes(new ArrayList<>(Arrays.asList("Kitty_love", "Guitar genius", "Solovieva Evgeniya")))
                .discount(12)
                .rating(2)
                .id(Post.generateID())
                .build());
        testPosts.add(Post.builder()
                .author("Kitty_love")
                .description("The cat will always cheer you up! Take the cat to your home.\n")
                .creationDate(new Date(21, Calendar.FEBRUARY, 12))
                .validateUntil(new Date(21, Calendar.FEBRUARY, 27))
                .photoLink("https://www.pressball.by/images/stories/2020/03/20200310231542.jpg")
                .hashTags(new ArrayList<>(Arrays.asList("kat", "love")))
                .likes(new ArrayList<>(Arrays.asList("Ivanov Ivan", "Solovieva Evgeniya")))
                .rating(5)
                .discount(100)
                .id(Post.generateID())
                .build());
        testPosts.add(Post.builder()
                .author("Lylalyuk Anna")
                .description("The most difficult thing in the morning is to get up. You can't get up with a flying alarm clock.\n")
                .creationDate(new Date(20, Calendar.FEBRUARY, 12))
                .validateUntil(new Date(20, Calendar.MARCH, 27))
                .photoLink("https://podaro4ek.by/images/stories/virtuemart/product/gadget_11.jpg")
                .hashTags(new ArrayList<>(Arrays.asList("technology", "morning")))
                .likes(new ArrayList<>(Arrays.asList("Popova Ksenia", "Solovieva Evgeniya")))
                .rating(5)
                .discount(100)
                .id(Post.generateID())
                .build());
        testPosts.add(Post.builder()
                .author("Guitar genius")
                .description("The most difficult thing in the morning is to get up. You won't be able to get up with a flying alarm clock.\n")
                .creationDate(new Date(20, Calendar.APRIL, 9))
                .validateUntil(new Date(20, Calendar.MAY, 20))
                .photoLink("https://opt-1289634.ssl.1c-bitrix-cdn.ru/upload/iblock/790/7906fe4ed570929ca640580f05a7b4f6.jpg?1562573455190287")
                .hashTags(new ArrayList<>(Arrays.asList("guitar", "learning_online")))
                .likes(new ArrayList<>(Arrays.asList("Popova Ksenia", "Ivanov Ivan")))
                .rating(3)
                .discount(25)
                .id(Post.generateID())
                .build());
        testPosts.add(Post.builder()
                .author("Solovieva Evgeniya")
                .description("The Swiss Hotel is located in the center of Lviv, in its historical part.\n")
                .creationDate(new Date(20, Calendar.SEPTEMBER, 19))
                .validateUntil(new Date(20, Calendar.SEPTEMBER, 20))
                .photoLink("https://opt-1289634.ssl.1c-bitrix-cdn.ru/upload/iblock/790/7906fe4ed570929ca640580f05a7b4f6.jpg?1562573455190287")
                .hashTags(new ArrayList<>(Arrays.asList("tourist", "love")))
                .likes(new ArrayList<>(Arrays.asList("Popova Ksenia", "Ivanov Ivan")))
                .rating(3)
                .discount(30)
                .id(Post.generateID())
                .build());
        testPosts.add(Post.builder()
                .author("Ivanov Alexander")
                .description("Any cards eventually fall into a deplorable state, but it is difficult to understand the players who, serenely losing significant amounts of preference, \"save\" on the deck.\n")
                .creationDate(new Date(20, Calendar.JANUARY, 1))
                .validateUntil(new Date(20, Calendar.JANUARY, 12))
                .photoLink("http://files.library.by/images/files/1476356097.jpg")
                .hashTags(new ArrayList<>(Arrays.asList("game", "cards")))
                .likes(new ArrayList<>(Arrays.asList("Popova Ksenia", "Ivanov Ivan", "Solovieva Evgeniya")))
                .rating(4)
                .discount(12)
                .id(Post.generateID())
                .build());
        testPosts.add(Post.builder()
                .author("Just furniture")
                .description("At a specialized furniture exhibition, Prostor-Mebel presents a completely new furniture system for Latvia under an intriguing name. Prostor-Mebel is a Russian company.\n")
                .creationDate(new Date(21, Calendar.JANUARY, 1))
                .validateUntil(new Date(21, Calendar.JANUARY, 12))
                .photoLink(null)
                .hashTags(new ArrayList<>(Arrays.asList("furniture", "sleep")))
                .likes(new ArrayList<>(Arrays.asList("Ivanov Alexander", "Ivanov Ivan", "Solovieva Evgeniya")))
                .rating(1)
                .discount(52)
                .id(Post.generateID())
                .build());
        testPosts.add(Post.builder()
                .author("Ivanov Alexander")
                .description("The Plantbook has a flexible display, touch keyboard, and… it rolls up into a tube! Also, to charge it, you can not only use ordinary solar energy, but also water!\n")
                .creationDate(new Date(21, Calendar.MAY, 1))
                .validateUntil(new Date(21, Calendar.MAY, 25))
                .photoLink("https://russianyellowpages.us/images/articles/29abuduschee.jpg")
                .hashTags(new ArrayList<>(Arrays.asList("technology", "science")))
                .likes(new ArrayList<>(Arrays.asList("Popova Ksenia", "Ivanov Ivan", "Solovieva Evgeniya")))
                .rating(5)
                .discount(80)
                .id(Post.generateID())
                .build());
    }
}
