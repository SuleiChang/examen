"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { alumnoSchema } from "@/validations/registerSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { updateAlumno } from "@/actions/register.actions";

interface FormUpdateAlumnoProps {
  alumno: z.infer<typeof alumnoSchema> & {
    updatedAt: Date;
  };
  id: number;
}

function FormUpdateAlumno({ alumno, id }: FormUpdateAlumnoProps) {
  const form = useForm<z.infer<typeof alumnoSchema>>({
    resolver: zodResolver(alumnoSchema),
    defaultValues: {
      nombre: alumno.nombre,
      curso: alumno.curso,
      nota1: alumno.nota1,
      nota2: alumno.nota2,
    }
  });

  const onSubmit = async (data: z.infer<typeof alumnoSchema>) => {
    console.log(data);
    try {
      await updateAlumno(id, data);
      console.log("Alumno actualizado correctamente.");
      // Aquí podrías agregar una redirección o un mensaje de éxito
    } catch (error: any) {
      console.error("Error al actualizar el alumno: %s", error.message);
    }
  };

  const promedio = ((alumno.nota1 + alumno.nota2) / 2).toFixed(2);
  const aprobado = Number(promedio) >= 11 ? "APROBADO" : "DESAPROBADO";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center">Actualizar Alumno</CardTitle>
              <CardDescription className="text-center">
                Modifica los datos del alumno.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <FormField
                control={form.control}
                name="nombre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del alumno" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="curso"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Curso</FormLabel>
                    <FormControl>
                      <Input placeholder="Nombre del curso" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="nota1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nota 1</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Nota 1" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="nota2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nota 2</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="Nota 2" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="mt-6 space-y-2">
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                    <span className="font-semibold text-gray-700">Estado:</span>
                    <span className={`font-bold ${aprobado === "APROBADO" ? "text-green-600" : "text-red-600"}`}>
                    {aprobado}
                    </span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                    <span className="font-semibold text-gray-700">Promedio final:</span>
                    <span className={`font-bold ${aprobado === "APROBADO" ? "text-gray-600" : "text-red-600"}`}>
                    {promedio}
                    </span>
                </div>
                <div className="flex justify-between items-center bg-gray-50 p-3 rounded-md">
                    <span className="font-semibold text-gray-700">Última actualización:</span>
                    <span className="text-gray-600">
                    {alumno.updatedAt.toLocaleString()}
                    </span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">Actualizar Alumno</Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
}

export default FormUpdateAlumno;