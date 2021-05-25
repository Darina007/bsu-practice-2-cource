import com.google.gson.JsonObject;
import com.google.gson.JsonParser;

import javax.servlet.http.HttpServletRequest;
import java.io.BufferedReader;
import java.io.IOException;

public interface jsonParser {
    default String getStringRequest(HttpServletRequest request) throws IOException {
        BufferedReader reader;
        reader = request.getReader();
        int intValueOfChar;
        StringBuilder result = new StringBuilder();
        while (true) {
            intValueOfChar = reader.read();
            if (intValueOfChar == -1) break;
            result.append((char) intValueOfChar);
        }
        return result.toString();
    }

    default JsonObject parseStringToJsonObj(String string) {
        JsonParser parser = new JsonParser();
        return parser.parse(string).getAsJsonObject();
    }
}
