import { database } from "@/lib/firebase";
import { ref, get, runTransaction } from "firebase/database";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// GET — read current counter value
export async function GET() {
    try {
        if (!database) {
            return NextResponse.json(
                { count: 0, error: "Firebase not configured" },
                {
                    status: 503,
                    headers: {
                        "Access-Control-Allow-Origin": "*",
                        "Access-Control-Allow-Methods": "GET, POST",
                    },
                }
            );
        }

        const counterRef = ref(database, "counter");
        const snapshot = await get(counterRef);
        const count = snapshot.exists() ? snapshot.val() : 0;

        return NextResponse.json(
            { count },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST",
                    "Cache-Control": "no-store, max-age=0",
                },
            }
        );
    } catch (error) {
        console.error("Error fetching counter:", error);
        return NextResponse.json(
            { count: 0, error: "Failed to fetch counter" },
            { status: 500 }
        );
    }
}

// POST — atomically increment counter by 1
export async function POST() {
    try {
        if (!database) {
            return NextResponse.json(
                { count: 0, error: "Firebase not configured" },
                { status: 503 }
            );
        }

        const counterRef = ref(database, "counter");
        const result = await runTransaction(counterRef, (currentValue) => {
            return (currentValue || 0) + 1;
        });

        const count = result.snapshot.val();

        return NextResponse.json(
            { count },
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Methods": "GET, POST",
                    "Cache-Control": "no-store, max-age=0",
                },
            }
        );
    } catch (error) {
        console.error("Error incrementing counter:", error);
        return NextResponse.json(
            { count: 0, error: "Failed to increment counter" },
            { status: 500 }
        );
    }
}

export async function OPTIONS() {
    return NextResponse.json(
        {},
        {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
                "Access-Control-Allow-Headers": "Content-Type",
            },
        }
    );
}
