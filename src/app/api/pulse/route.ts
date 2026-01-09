import { NextRequest, NextResponse } from 'next/server';
import { saveEvent } from '@/lib/analytics/storage';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
        // Simple mock geo-lookup could go here, or handled at display time.
        // For Vercel/similar, 'x-vercel-ip-country' works.
        const country = req.headers.get('x-vercel-ip-country') || 'Unknown';
        const userAgent = req.headers.get('user-agent') || 'Unknown';

        await saveEvent({
            sessionId: body.sessionId,
            path: body.path,
            section: body.section,
            duration: body.duration,
            ip: String(ip).split(',')[0], // Take first IP if multiple
            country,
            userAgent
        });

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Analytics Error:', error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}
