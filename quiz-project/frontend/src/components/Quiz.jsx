import { useState, useEffect } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import '../css/Quiz.css';

export default function Quiz({ token, userId }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState("");
  const [finished, setFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const navigate = useNavigate();

  // Buscar perguntas do backend
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const res = await api.get("/quiz/questions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setQuestions(res.data);
        setIsLoading(false);
      } catch (err) {
        alert("Erro ao carregar perguntas");
        setIsLoading(false);
      }
    };
    fetchQuestions();
  }, [token]);

  const handleAnswer = (option) => {
    if (showFeedback) return; // Não permite mudar resposta após feedback
    setSelected(option);
  };

  const handleSubmitAnswer = () => {
    if (!selected) {
      alert("Escolha uma opção antes de continuar!");
      return;
    }

    // Checar se acertou
    const correctOption = questions[current].correct_option;
    const correct = selected === correctOption;
    setIsCorrect(correct);
    
    if (correct) setScore(score + 1);

    // Salvar resposta do usuário
    setUserAnswers([...userAnswers, { question: current, answer: selected, correct }]);
    
    setShowFeedback(true);
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(current + 1);
      setSelected("");
      setShowFeedback(false);
    } else {
      setFinished(true);
      submitResult();
    }
  };

  // Enviar resultado para o backend
  const submitResult = async () => {
    try {
      await api.post("/quiz/submit", { user_id: userId, score });
    } catch (err) {
      alert("Erro ao salvar resultado");
    }
  };

  const resetQuiz = () => {
    setCurrent(0);
    setScore(0);
    setSelected("");
    setFinished(false);
    setShowFeedback(false);
    setUserAnswers([]);
  };

  if (isLoading) {
    return (
      <div className="quiz-container">
        <div className="quiz-loading">
          <div className="loading-spinner-large"></div>
          <h3>Carregando perguntas...</h3>
          <p>Preparando seu quiz tecnológico</p>
        </div>
      </div>
    );
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);
    const getPerformanceMessage = () => {
      if (percentage >= 90) return "Excelente! Você é um mestre da tecnologia!";
      if (percentage >= 70) return "Muito bom! Você tem um bom conhecimento!";
      if (percentage >= 50) return "Bom! Continue estudando!";
      return "Continue praticando! Você vai melhorar!";
    };

    return (
      <div className="quiz-container">
        <div className="quiz-background">
          <div className="tech-grid"></div>
          <div className="floating-particles">
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
            <div className="particle"></div>
          </div>
        </div>
        
        <div className="quiz-result-card">
          <div className="result-header">
            <div className="result-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h1 className="result-title">Quiz Finalizado!</h1>
            <p className="result-subtitle">{getPerformanceMessage()}</p>
          </div>

          <div className="result-stats">
            <div className="stat-item">
              <div className="stat-number">{score}</div>
              <div className="stat-label">Acertos</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{questions.length - score}</div>
              <div className="stat-label">Erros</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">{percentage}%</div>
              <div className="stat-label">Precisão</div>
            </div>
          </div>

          <div className="result-actions">
            <button className="btn-primary" onClick={resetQuiz}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 4V10H7M23 20V14H17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10M23 14L18.36 18.36A9 9 0 0 1 3.51 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Refazer Quiz
            </button>
            <button className="btn-secondary" onClick={() => navigate("/")}>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12L9 6L15 12M9 6V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Voltar ao Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  const q = questions[current];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <div className="quiz-container">
      <div className="quiz-background">
        <div className="tech-grid"></div>
        <div className="floating-particles">
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
          <div className="particle"></div>
        </div>
      </div>

      <div className="quiz-card">
        {/* Header com Progresso */}
        <div className="quiz-header">
          <div className="quiz-progress">
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="progress-text">
              Pergunta {current + 1} de {questions.length}
            </div>
          </div>
          
          <div className="quiz-score">
            <div className="score-icon">
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L15.09 8.26L22 9L17 14L18.18 21L12 17.77L5.82 21L7 14L2 9L8.91 8.26L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <span className="score-text">{score}</span>
          </div>
        </div>

        {/* Pergunta */}
        <div className="question-section">
          <h2 className="question-text">{q.question_text}</h2>
        </div>

        {/* Opções de Resposta */}
        <div className="options-section">
          {["A", "B", "C", "D"].map((opt, index) => {
            const isSelected = selected === opt;
            const isCorrectAnswer = opt === q.correct_option;
            const showCorrect = showFeedback && isCorrectAnswer;
            const showIncorrect = showFeedback && isSelected && !isCorrectAnswer;
            
            return (
              <button
                key={opt}
                className={`option-button ${isSelected ? 'selected' : ''} ${showCorrect ? 'correct' : ''} ${showIncorrect ? 'incorrect' : ''}`}
                onClick={() => handleAnswer(opt)}
                disabled={showFeedback}
              >
                <div className="option-content">
                  <div className="option-letter">{opt}</div>
                  <div className="option-text">{q[`option_${opt.toLowerCase()}`]}</div>
                  {showCorrect && (
                    <div className="option-feedback correct-feedback">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                  {showIncorrect && (
                    <div className="option-feedback incorrect-feedback">
                      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Feedback */}
        {showFeedback && (
          <div className={`feedback-section ${isCorrect ? 'correct' : 'incorrect'}`}>
            <div className="feedback-icon">
              {isCorrect ? (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                  <path d="M15 9L9 15M9 9L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <div className="feedback-text">
              {isCorrect ? "Correto! 🎉" : "Incorreto! 😔"}
            </div>
          </div>
        )}

        {/* Pato Amarelo para Respostas Incorretas */}
        {showFeedback && !isCorrect && (
          <div className="duck-feedback">
            <div className="duck-container">
              <div className="duck">
                <div className="duck-body">
                  <div className="duck-head">
                    <div className="duck-eye"></div>
                    <div className="duck-beak"></div>
                  </div>
                  <div className="duck-wing"></div>
                </div>
                <div className="duck-tail"></div>
              </div>
              <div className="duck-speech-bubble">
                <div className="speech-content">
                  <div className="speech-title">Quack! Quack! 🦆</div>
                  <div className="speech-text">
                    <p><strong>Resposta correta:</strong> {q.correct_option}</p>
                    <p><strong>Explicação:</strong> {q.explanation || "Esta é a resposta correta baseada no conhecimento técnico atual."}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Botões de Ação */}
        <div className="action-section">
          {!showFeedback ? (
            <button 
              className={`action-button ${!selected ? 'disabled' : ''}`}
              onClick={handleSubmitAnswer}
              disabled={!selected}
            >
              <span>Confirmar Resposta</span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          ) : (
            <button 
              className="action-button next-button"
              onClick={handleNext}
            >
              <span>{current + 1 === questions.length ? "Finalizar Quiz" : "Próxima Pergunta"}</span>
              <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
