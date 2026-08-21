import NextAuth from "next-auth";

import { edgeAuthConfig } from "~/server/auth/edge-config";

export const { auth } = NextAuth(edgeAuthConfig);
