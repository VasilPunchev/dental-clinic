import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;

const supabase = createClient(supabaseUrl, supabaseSecretKey);

export async function POST(req) {
  try {
    const body = await req.json();

    const {
      name,
      phone,
      service,
      preferredDate,
      preferredHour,
      message,
    } = body;

    const phoneDigits = phone?.replace(/\D/g, "") || "";

    const nameParts = name?.trim().split(/\s+/) || [];
    const cyrillicNameRegex = /^[А-Я][а-я]+(?:-[А-Я][а-я]+)?$/;

    if (nameParts.length < 2) {
      return Response.json(
        { error: "Моля, въведете име и фамилия." },
        { status: 400 }
      );
    }

    if (nameParts.some((part) => !cyrillicNameRegex.test(part))) {
      return Response.json(
        {
          error:
            "Моля, въведете име и фамилия на кирилица, започващи с главна буква.",
        },
        { status: 400 }
      );
    }

    if (!phone || phoneDigits.length < 8) {
      return Response.json(
        { error: "Моля, въведете валиден телефонен номер." },
        { status: 400 }
      );
    }

    if (!service || !preferredDate || !preferredHour) {
      return Response.json(
        { error: "Моля, попълнете всички задължителни полета." },
        { status: 400 }
      );
    }

    const appointment = {
      name: name.trim(),
      phone: phone.trim(),
      service,
      preferred_date: preferredDate,
      preferred_hour: preferredHour,
      message: message?.trim() || "",
      status: "new",
    };

    const { data, error } = await supabase
      .from("appointments")
      .insert([appointment])
      .select()
      .single();

    if (error) {
      console.error("Supabase error:", error);

      return Response.json(
        { error: "Заявката не беше записана. Опитайте отново." },
        { status: 500 }
      );
    }

    console.log("Нова заявка за час:", data);

    return Response.json(
      {
        success: true,
        message: "Заявката е приета успешно.",
        appointment: data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Грешка при заявка за час:", error);

    return Response.json(
      { error: "Възникна грешка. Опитайте отново." },
      { status: 500 }
    );
  }
}