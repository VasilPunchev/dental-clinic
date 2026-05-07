import { createClient } from "@supabase/supabase-js";
import { cookies } from "next/headers";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

const supabase = createClient(supabaseUrl, supabaseSecretKey);

export async function PATCH(req, { params }) {
    try {
        const cookieStore = await cookies();
        const isAdmin = cookieStore.get("admin-auth")?.value === "true";

        if (!isAdmin) {
            return Response.json({ error: "Нямате достъп." }, { status: 401 });
        }

        const { id } = await params;
        const body = await req.json();
        const { status } = body;

        const allowedStatuses = ["new", "confirmed", "cancelled"];

        if (!allowedStatuses.includes(status)) {
            return Response.json({ error: "Невалиден статус." }, { status: 400 });
        }

        const { data, error } = await supabase
            .from("appointments")
            .update({ status })
            .eq("id", id)
            .select()
            .single();

        if (error) {
            console.error("Supabase status update error:", error);

            return Response.json(
                { error: "Статусът не беше обновен." },
                { status: 500 }
            );
        }

        return Response.json({
            success: true,
            appointment: data,
        });
    } catch (error) {
        console.error("Status update error:", error);

        return Response.json(
            { error: "Възникна грешка. Опитайте отново." },
            { status: 500 }
        );
    }
}