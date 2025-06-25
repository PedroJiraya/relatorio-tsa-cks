
interface DigitalSignatureProps {
  name: string;
  title: string;
}

const DigitalSignature = ({ name, title }: DigitalSignatureProps) => {
  if (!name.trim()) {
    return (
      <div className="text-center">
        <div className="border-b border-gray-400 mb-2 pb-8"></div>
        <p className="text-sm font-medium">{title}</p>
      </div>
    );
  }

  // Gera uma assinatura digitalizada simples baseada no nome
  const generateSignature = (fullName: string) => {
    const names = fullName.split(' ').filter(n => n.length > 0);
    if (names.length === 0) return '';
    
    // Pega a primeira letra do primeiro nome e do último nome
    const firstInitial = names[0][0].toUpperCase();
    const lastInitial = names[names.length - 1][0].toUpperCase();
    
    return `${firstInitial}${lastInitial}`;
  };

  const signature = generateSignature(name);

  return (
    <div className="text-center">
      <div className="border-b border-gray-400 mb-2 pb-4 flex justify-center items-end h-16">
        <div className="text-2xl font-serif italic text-blue-600 transform -rotate-12">
          {signature}
        </div>
      </div>
      <p className="text-sm font-medium">{name}</p>
      <p className="text-xs text-gray-600">{title}</p>
      <p className="text-xs text-gray-400 mt-1">Assinatura Digital</p>
    </div>
  );
};

export default DigitalSignature;
