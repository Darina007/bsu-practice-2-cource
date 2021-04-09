import java.util.*;

public class TestPosts {
    public static List<Post> testPosts;
    static {
        testPosts = new ArrayList<>();
        testPosts.add(new Post("Ivanov Ivan",
                "More than 76 thousand people around the world have already recovered from the disease provoked by the new coronavirus. New vaccine especially for you!\n",
                new Date(21, Calendar.FEBRUARY, 17),
                new Date(21, Calendar.FEBRUARY, 27),
                "https://www.pressball.by/images/stories/2020/03/20200310231542.jpg",
                new ArrayList<>(Arrays.asList("krone", "virus", "vaccine")),
                new ArrayList<>(Arrays.asList("Kitty_love", "Guitar genius", "Solovieva Evgeniya")),
                2,
                12));
        testPosts.add(new Post("Kitty_love",
                "The cat will always cheer you up! Take the cat to your home.\n",
                new Date(21, Calendar.FEBRUARY, 12),
                new Date(21, Calendar.FEBRUARY, 27),
                "https://www.pressball.by/images/stories/2020/03/20200310231542.jpg",
                new ArrayList<>(Arrays.asList("kat", "love")),
                new ArrayList<>(Arrays.asList("Ivanov Ivan", "Solovieva Evgeniya")),
                5,
                100));
        testPosts.add(new Post("Lylalyuk Anna",
                "The most difficult thing in the morning is to get up. You can't get up with a flying alarm clock.\n",
                new Date(20, Calendar.FEBRUARY, 12),
                new Date(20, Calendar.MARCH, 27),
                "https://podaro4ek.by/images/stories/virtuemart/product/gadget_11.jpg",
                new ArrayList<>(Arrays.asList("technology", "morning")),
                new ArrayList<>(Arrays.asList("Popova Ksenia", "Solovieva Evgeniya")),
                5,
                100));
        testPosts.add(new Post("Guitar genius",
                "The most difficult thing in the morning is to get up. You won't be able to get up with a flying alarm clock.\n",
                new Date(20, Calendar.APRIL, 9),
                new Date(20, Calendar.MAY, 20),
                "https://opt-1289634.ssl.1c-bitrix-cdn.ru/upload/iblock/790/7906fe4ed570929ca640580f05a7b4f6.jpg?1562573455190287",
                new ArrayList<>(Arrays.asList("guitar", "learning_online")),
                new ArrayList<>(Arrays.asList("Popova Ksenia", "Ivanov Ivan")),
                3,
                25));
        testPosts.add(new Post("Solovieva Evgeniya",
                "The Swiss Hotel is located in the center of Lviv, in its historical part.\n",
                new Date(20, Calendar.SEPTEMBER, 19),
                new Date(20, Calendar.SEPTEMBER, 20),
                "https://opt-1289634.ssl.1c-bitrix-cdn.ru/upload/iblock/790/7906fe4ed570929ca640580f05a7b4f6.jpg?1562573455190287",
                new ArrayList<>(Arrays.asList("tourist", "love")),
                new ArrayList<>(Arrays.asList("Popova Ksenia", "Ivanov Ivan")),
                3,
                30));
        testPosts.add(new Post("Ivanov Alexander",
                "Any cards eventually fall into a deplorable state, but it is difficult to understand the players who, serenely losing significant amounts of preference, \"save\" on the deck.\n",
                new Date(20, Calendar.JANUARY, 1),
                new Date(20, Calendar.JANUARY, 12),
                "http://files.library.by/images/files/1476356097.jpg",
                new ArrayList<>(Arrays.asList("game", "cards")),
                new ArrayList<>(Arrays.asList("Popova Ksenia", "Ivanov Ivan", "Solovieva Evgeniya")),
                4,
                12));
        testPosts.add(new Post("Just furniture",
                "At a specialized furniture exhibition, Prostor-Mebel presents a completely new furniture system for Latvia under an intriguing name. Prostor-Mebel is a Russian company.\n",
                new Date(21, Calendar.JANUARY, 1),
                new Date(21, Calendar.JANUARY, 12),
                null,
                new ArrayList<>(Arrays.asList("furniture", "sleep")),
                new ArrayList<>(Arrays.asList("Ivanov Alexander", "Ivanov Ivan", "Solovieva Evgeniya")),
                1,
                52));
        testPosts.add(new Post("Ivanov Alexander",
                "The Plantbook has a flexible display, touch keyboard, and… it rolls up into a tube! Also, to charge it, you can not only use ordinary solar energy, but also water!\n",
                new Date(21, Calendar.MAY, 1),
                new Date(21, Calendar.MAY, 25),
                "https://russianyellowpages.us/images/articles/29abuduschee.jpg",
                new ArrayList<>(Arrays.asList("technology", "science")),
                new ArrayList<>(Arrays.asList("Popova Ksenia", "Ivanov Ivan", "Solovieva Evgeniya")),
                5,
                80));
    }
}
