import com.google.gson.JsonObject;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public interface filterParser {
    default int parseTopParam(JsonObject object) {
        if (object.get(ConstantDictionary.KEY_TOP) != null) {
            return object.get(ConstantDictionary.KEY_TOP).getAsInt();
        }
        return 10;
    }

    default int parseSkipParam(JsonObject object) {
        if (object.get(ConstantDictionary.KEY_SKIP) != null) {
            return object.get(ConstantDictionary.KEY_SKIP).getAsInt();
        }
        return 0;
    }

    default String parseAuthor(JsonObject object) {
        return object.get(ConstantDictionary.KEY_AUTHOR).getAsString();
    }
    default String parseHashTag(JsonObject object) {
        return object.get(ConstantDictionary.KEY_HASHTAG).getAsString();
    }

    default int parseDiscount(JsonObject object) {
        return object.get(ConstantDictionary.KEY_DISCOUNT).getAsInt();
    }

    default int parseRating(JsonObject object) {
        return object.get(ConstantDictionary.KEY_RATING).getAsInt();
    }

    default Date parseCreateDate(JsonObject object) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat(ConstantDictionary.DATE_PATTERN);
        return format.parse(object.get(ConstantDictionary.KEY_CREATION_DATE).getAsString());
    }

    default Date parseValidDate(JsonObject object) throws ParseException {
        SimpleDateFormat format = new SimpleDateFormat(ConstantDictionary.DATE_PATTERN);
        return format.parse(object.get(ConstantDictionary.KEY_VALIDATE_UNTIL).getAsString());
    }


}
