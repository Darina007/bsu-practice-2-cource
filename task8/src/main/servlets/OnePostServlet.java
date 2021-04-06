public class OnePostServlet {
    private TweetsWork posts = new TweetsWork();
    @Override
    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String str = request.getQueryString();
        String sID=str.substring(3,str.length());
        int id = Integer.parseInt(sID);
        response.getOutputStream().println("it Works id= " + id);
        if (posts.removePost(id)) {
            response.getOutputStream().println("deleted\n");
        } else {
            response.getOutputStream().println("Not found\n");
        }
    }
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        // response.getOutputStream().println("yes, it works");
        String str = request.getQueryString();
        String sID=str.substring(3,str.length());
        int id = Integer.parseInt(sID);
        Post tweet = posts.getPost(id);

        if (tweet != null) {
            response.getOutputStream().println(tweet.toString());
            // response.getOutputStream().println(str1);
        } else {
            response.getOutputStream().println("Not found\n");
        }
    }
    @Override
    protected void doPost(HttpServletRequest request,HttpServletResponse response) throws IOException{
        int id = Integer.parseInt(request.getParameter("id"));
        String description = request.getParameter("description");
        String author = request.getParameter("author");
        String photoLink = request.getParameter("photoLink");
        Date date = new Date();
        String createdAt=date.toString();
        //добавить хештеги

        Post tweet = new Post(id, description, createdAt, author,  photoLink, new ArrayList<>(), new ArrayList<>());

        response.getOutputStream().println(tweet.toString());
        if (posts.addPost(tweet)) {
            response.getOutputStream().println("Success\n");
        } else {
            response.getOutputStream().println("Invalid\n");
        }
    }
}
