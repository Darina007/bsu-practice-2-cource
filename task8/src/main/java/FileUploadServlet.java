import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.*;

@MultipartConfig
@WebServlet("/upload")
public class FileUploadServlet extends HttpServlet {
    private static final String UPLOAD_DIR = "uploads";
    private static final String UPLOAD = "/upload";
    private static final String SUCCESS_UPLOADING = " File uploaded successfully!\nTo: ";
    private static final String KEY_FILE_NAME = "fileName";
    private static final String CONTENT_TYPE = "image/jpeg";
    private static final String CONTENT_DISPOSITION = "content-disposition";

    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response) throws ServletException, IOException {
        String applicationPath = request.getServletContext().getRealPath("");
        String uploadFilePath = applicationPath + File.separator + UPLOAD_DIR;

        File fileSaveDir = new File(uploadFilePath);
        if (!fileSaveDir.exists()) {
            fileSaveDir.mkdirs();
        }
        String fileName = null;
        for (Part part : request.getParts()) {
            fileName = getFileName(part);
            part.write(uploadFilePath + File.separator + fileName);
        }
        response.getWriter().write(fileName + SUCCESS_UPLOADING + uploadFilePath);
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        String URLAfterWebDomain = request.getRequestURI();
        String fileName = request.getParameter(KEY_FILE_NAME);
        String applicationPath = request.getServletContext().getRealPath("");
        String uploadFilePath = applicationPath + File.separator + UPLOAD_DIR;
        if (!URLAfterWebDomain.startsWith(UPLOAD)) {
            return;
        }
        response.setContentType(CONTENT_TYPE);
        ServletOutputStream outStream;
        outStream = response.getOutputStream();
        FileInputStream fin = new FileInputStream(uploadFilePath + "/" + fileName);
        BufferedInputStream bin = new BufferedInputStream(fin);
        BufferedOutputStream bout = new BufferedOutputStream(outStream);
        int ch;
        while ((ch = bin.read()) != -1) {
            bout.write(ch);
        }
        bin.close();
        fin.close();
        bout.close();
        outStream.close();
    }

    private String getFileName(Part part) {
        String contentDisposition = part.getHeader(CONTENT_DISPOSITION);
        String[] tokens = contentDisposition.split(";");
        for (String token : tokens) {
            if (token.trim().startsWith(KEY_FILE_NAME)) {
                return token.substring(token.indexOf("=") + 2, token.length() - 1);
            }
        }
        return "";
    }
}