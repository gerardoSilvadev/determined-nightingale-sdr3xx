import React, { useState, useEffect } from "react";
import workout from "../public/WorkoutTable.css";

// Datos iniciales de los ejercicios para cada tabla
const initialExercises = [
  {
    exercise: "Weak Point Exercise 1 (optional)",
    sets: "3",
    reps: "8-12",
    rest: "~1-3 min",
    substitution1: "N/A",
    substitution2: "N/A",
    notes: "Decide on your weak point using the Weak Point Table.",
  },
  {
    exercise: "Bottom-Half Machine Preacher Curl",
    sets: "1",
    reps: "10-12",
    rest: "~1-2 min",
    substitution1: "Bottom-Half EZ-Bar Preacher Curl",
    substitution2: "Bottom-Half DB Preacher Curl",
    notes:
      "All reps and sets are to be performed in the bottom half of the ROM.",
  },
  // Más ejercicios...
];

// Estado inicial para cada tabla, incluyendo un nombre
const initialTable = {
  name: "Añadir Nueva Tabla", // Nombre por defecto
  exercises: initialExercises,
};

const WorkoutTable = () => {
  // Estado para manejar múltiples tablas de ejercicios
  const [tables, setTables] = useState(() => {
    // Cargar las tablas desde el almacenamiento local, si están disponibles
    const savedTables = localStorage.getItem("workoutTables");
    return savedTables ? JSON.parse(savedTables) : [initialTable];
  });

  // Guardar tablas en localStorage cada vez que cambian
  useEffect(() => {
    localStorage.setItem("workoutTables", JSON.stringify(tables));
  }, [tables]);

  // Función para manejar los cambios en los inputs de los ejercicios
  const handleInputChange = (tableIndex, exerciseIndex, field, value) => {
    const newTables = [...tables]; // Crear una copia de todas las tablas
    newTables[tableIndex].exercises[exerciseIndex][field] = value; // Actualizar el campo editado en la tabla correspondiente
    setTables(newTables); // Actualizar el estado de las tablas
  };

  // Función para manejar el cambio del nombre de la tabla
  const handleTableNameChange = (tableIndex, value) => {
    const newTables = [...tables];
    newTables[tableIndex] = { ...newTables[tableIndex], name: value }; // Actualizar el nombre de la tabla correspondiente
    setTables(newTables); // Actualizar el estado
  };

  // Función para añadir un nuevo ejercicio a una tabla específica
  const addExercise = (tableIndex) => {
    const newExercise = {
      exercise: "",
      sets: "",
      reps: "",
      rest: "",
      substitution1: "",
      substitution2: "",
      notes: "",
    };
    const newTables = [...tables];
    newTables[tableIndex].exercises = [
      ...newTables[tableIndex].exercises,
      newExercise,
    ]; // Añadir el nuevo ejercicio a la tabla seleccionada
    setTables(newTables); // Actualizar el estado
  };

  // Función para añadir una nueva tabla de ejercicios
  const addTable = () => {
    setTables([...tables, initialTable]); // Añadir una nueva tabla con los ejercicios iniciales y un nombre predeterminado
  };

  return (
    <div>
      <h1>Workout Plan - Editable Tables</h1>

      {/* Botón para añadir nuevas tablas */}
      <button onClick={addTable}>Agregar Nueva Tabla</button>

      {tables.map((table, tableIndex) => (
        <div key={tableIndex} style={{ marginBottom: "30px" }}>
          {/* Editable Table Name */}
          <input
            type="text"
            value={table.name}
            onChange={(e) => handleTableNameChange(tableIndex, e.target.value)}
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
              textAlign: "center",
              marginBottom: "10px",
              display: "block",
              width: "100%",
            }}
          />

          <button onClick={() => addExercise(tableIndex)}>
            Agregar Nuevo Ejercicio
          </button>

          {/* Tabla de ejercicios */}
          <table>
            <thead>
              <tr>
                <th>Exercise</th>
                <th>Working Sets</th>
                <th>Reps</th>
                <th>Rest</th>
                <th>Substitution Option 1</th>
                <th>Substitution Option 2</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              {table.exercises.map((exercise, exerciseIndex) => (
                <tr key={exerciseIndex}>
                  <td>
                    <input
                      type="text"
                      value={exercise.exercise}
                      onChange={(e) =>
                        handleInputChange(
                          tableIndex,
                          exerciseIndex,
                          "exercise",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={exercise.sets}
                      onChange={(e) =>
                        handleInputChange(
                          tableIndex,
                          exerciseIndex,
                          "sets",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={exercise.reps}
                      onChange={(e) =>
                        handleInputChange(
                          tableIndex,
                          exerciseIndex,
                          "reps",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={exercise.rest}
                      onChange={(e) =>
                        handleInputChange(
                          tableIndex,
                          exerciseIndex,
                          "rest",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={exercise.substitution1}
                      onChange={(e) =>
                        handleInputChange(
                          tableIndex,
                          exerciseIndex,
                          "substitution1",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={exercise.substitution2}
                      onChange={(e) =>
                        handleInputChange(
                          tableIndex,
                          exerciseIndex,
                          "substitution2",
                          e.target.value
                        )
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={exercise.notes}
                      onChange={(e) =>
                        handleInputChange(
                          tableIndex,
                          exerciseIndex,
                          "notes",
                          e.target.value
                        )
                      }
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default WorkoutTable;
