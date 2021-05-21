import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public interface postParser {
    default String parseId(JsonObject object) {
        return object.get(ConstantDictionary.KEY_ID).getAsString();
    }

    default String parseAuthor(JsonObject object) {
        return object.get(ConstantDictionary.KEY_AUTHOR).getAsString();
    }

    default String parseDescription(JsonObject object) {
        return object.get(ConstantDictionary.KEY_DESCRIPTION).getAsString();
    }

    default int parseDiscount(JsonObject object) {
        return object.get(ConstantDictionary.KEY_DISCOUNT).getAsInt();
    }

    default int parseRating(JsonObject object) {
        return object.get(ConstantDictionary.KEY_RATING).getAsInt();
    }

    default List<String> parseHashTah(JsonObject object) {
        Gson g = new Gson();
        return g.fromJson(object.get(ConstantDictionary.KEY_HASHTAG), List.class);
    }

    default List<String> parseLikes(JsonObject object) {
        Gson g = new Gson();
        return g.fromJson(object.get(ConstantDictionary.KEY_LIKES), List.class);
    }

    default Date parseCreateDate(JsonObject object) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat(ConstantDictionary.DATE_PATTERN);
        return format.parse(object.get(ConstantDictionary.KEY_CREATION_DATE).getAsString());
    }

    default Date parseValidDate(JsonObject object) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat(ConstantDictionary.DATE_PATTERN);
        return format.parse(object.get(ConstantDictionary.KEY_VALIDATE_UNTIL).getAsString());
    }

    default Post parsePostFields(JsonObject object) throws ParseException {
        return Post.builder()
                .id(parseId(object))
                .author(parseAuthor(object))
                .description(parseDescription(object))
                .createdAt(parseCreateDate(object))
                .validateUntil(parseValidDate(object))
                .hashTags(parseHashTah(object))
                .likes(parseLikes(object))
                .rating(parseRating(object))
                .discount(parseDiscount(object))
                .build();
    }

    default Post parseEditFields(JsonObject object) throws ParseException {
        return Post.builder()
                .description(parseDescription(object))
                .validateUntil(parseValidDate(object))
                .hashTags(parseHashTah(object))
                .discount(parseDiscount(object))
                .build();
    }
}

