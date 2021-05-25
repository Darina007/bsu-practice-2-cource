import com.google.gson.Gson;
import com.google.gson.JsonObject;

import java.security.PublicKey;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;

public interface postParser extends jsonParser {
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
        if (object.get(ConstantDictionary.KEY_RATING) == null) {
            return 0;
        }
        return object.get(ConstantDictionary.KEY_RATING).getAsInt();
    }

    default List<String> parseHashTah(JsonObject object) {
        Gson g = new Gson();
        return g.fromJson(object.get(ConstantDictionary.KEY_HASHTAG), List.class);
    }

    default List<String> parseLikes(JsonObject object) {
        Gson g = new Gson();
        if (object.get(ConstantDictionary.KEY_LIKES) == null) {
            return new LinkedList<>();
        }
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
        return null;
    }

    default Comment parseCommentFields(JsonObject object) throws ParseException {
        return null;
    }
}

