import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.*;
import java.util.logging.Level;
import java.util.logging.Logger;

@MultipartConfig
@WebServlet("/upload")
public class FileUploadServlet extends HttpServlet {
    private static final String UPLOAD_DIR = "uploads";
    private static final String UPLOAD = "/upload";
    private static final String SUCCESS_UPLOADING = " File uploaded successfully!\nTo: ";
    private static final String KEY_FILE_NAME = "fileName";
    private static final String CONTENT_TYPE = "image/jpeg";
    private static final String CONTENT_DISPOSITION = "content-disposition";
    private static Logger log = Logger.getLogger(FileUploadServlet.class.getName());

    protected void doPost(HttpServletRequest request,
                          HttpServletResponse response) {
        String applicationPath = request.getServletContext().getRealPath("");
        String uploadFilePath = applicationPath + File.separator + UPLOAD_DIR;
        File fileSaveDir = new File(uploadFilePath);
        if (!fileSaveDir.exists()) {
            fileSaveDir.mkdirs();
        }
        String fileName = null;
        try {
            for (Part part : request.getParts()) {
                fileName = getFileName(part);
                part.write(uploadFilePath + File.separator + fileName);
            }
            response.getWriter().write(fileName + SUCCESS_UPLOADING + uploadFilePath);
        } catch (IOException | ServletException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
    }

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) {
        String URLAfterWebDomain = request.getRequestURI();
        String fileName = request.getParameter(KEY_FILE_NAME);
        String applicationPath = request.getServletContext().getRealPath("");
        String uploadFilePath = applicationPath + File.separator + UPLOAD_DIR;
        if (!URLAfterWebDomain.startsWith(UPLOAD)) {
            return;
        }
        response.setContentType(CONTENT_TYPE);
        try (ServletOutputStream outStream = response.getOutputStream();
             FileInputStream fin = new FileInputStream(uploadFilePath + "/" + fileName);
             BufferedInputStream bin = new BufferedInputStream(fin);
             BufferedOutputStream bout = new BufferedOutputStream(outStream)) {
            int ch;
            while ((ch = bin.read()) != -1) {
                bout.write(ch);
            }
        } catch (IOException e) {
            log.log(Level.SEVERE, "Exception: ", e);
        }
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