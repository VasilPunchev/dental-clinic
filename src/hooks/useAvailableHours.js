'use client'

import { useEffect, useState } from "react"
import { getAvailableHours } from "@/services/availabilityService"

export function useAvailableHours( date ) {
  const [availableHours, setAvailableHours] = useState([]);
  const [isLoadingHours, setIsLoadingHours] = useState(false);
  const [error, setError] = useState("");

  useEffect(()=> {
    if ( !date ) {
        return;
    }
    const controller = new AbortController();

    async function loadAvailableHours() {
        setIsLoadingHours(true)
        setError('');
         try {
        const hours = await getAvailableHours(date, {signal: controller.signal});
        setAvailableHours(hours)
    }
    catch(requestError) {
        if (requestError.name === 'AbortError') {
            return;
        }
        setAvailableHours([])
        setError(requestError.message)
    }
    finally {
        if (!controller.signal.aborted) {
            setIsLoadingHours(false)
        }
    }
    }
   
    loadAvailableHours();
    return () => controller.abort();
  }, [date]);

  return {
    availableHours: date ? availableHours: [],
    isLoadingHours: date ? isLoadingHours: false,
    error: date ? error: '',
  };
}
