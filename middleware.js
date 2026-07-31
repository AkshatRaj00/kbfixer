// middleware.js
import { NextResponse } from 'next/server';

// Sliding Window Rate Limiter
const rateLimitMap = new Map();

export function middleware(request) {
  const ip = request.ip || request.headers.get('x-forwarded-for') || '127.0.0.1';
  const limit = 30; // Max 30 requests per minute
  const windowMs = 60 * 1000;

  const currentUsage = rateLimitMap.get(ip) || { count: 0, resetTime: Date.now() + windowMs };

  // Reset limit window
  if (Date.now() > currentUsage.resetTime) {
    currentUsage.count = 0;
    currentUsage.resetTime = Date.now() + windowMs;
  }

  currentUsage.count += 1;
  rateLimitMap.set(ip, currentUsage);

  // Block Spam Bots
  if (currentUsage.count > limit) {
    return new NextResponse('Rate Limit Exceeded: Too many automated requests from your IP.', {
      status: 429,
      headers: { 'Content-Type': 'text/plain' },
    });
  }

  const response = NextResponse.next();

  // Inject High-Security HTTP Headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('X-XSS-Protection', '1; mode=block');

  return response;
}

export const config = {
  matcher: ['/image', '/pdf', '/word', '/ppt'],
};