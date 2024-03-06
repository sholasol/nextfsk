export const authConfig = {
    pages: {
        signIn: "/login"
    },
    providers:[],
    callbacks: {
    async jwt({token, user}){
        if(user){
            token.id = user.id;
            token.username = user.username;
            token.isAdmin = user.isAdmin;
        }
        return token;
    },
    async session({session, token}){
         if(token){
            session.user.id = token.id;
            session.user.username = token.username;
            session.user.isAdmin = token.isAdmin;
         }
         return session;
    },
         authorized({auth, request}){
            const user = auth?.user;
            const isOnAdminPage = request.nextUrl?.pathname.startsWith("/admin");
            const isOnABlogPage = request.nextUrl?.pathname.startsWith("/blog");
            const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

            //ONLY Admin can reach admin dashboard
            if(isOnAdminPage && !user?.isAdmin){
                return false;
            }
            //only authenticated user can reach blog page
            if(isOnABlogPage && !user){
                return false;
            }

            //only unauthenticated user can reach the login page
            if(isOnLoginPage && user){
                return Response.redirect(new URL("/", request.nextUrl));
            }

            return true;
        }
    }
}